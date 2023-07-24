import axios from "axios";
import { type HTMLElement, parse } from "node-html-parser";
import * as qs from "querystring";

const sigaEndpoint = "https://siga.cps.sp.gov.br/ALUNO/login.aspx";

export interface RequestLoginParams {
  username: string;
  password: string;
  cookie?: string;
}
export interface RequestLoginResponse {
  cookie: string;
  parsedHtml: HTMLElement;
}

async function getCookie(): Promise<string> {
  const response = await axios.get(sigaEndpoint, {
    withCredentials: true,
  });

  // Pegando os cookies da sessão não autenticada
  const cookies = response.headers["set-cookie"];
  if (cookies == null) throw new Error("Não foi possível obter os cookies");

  return cookies[0].split(";")[0] + ";";
}

export async function requestLogin({
  username,
  password,
  cookie,
}: RequestLoginParams): Promise<RequestLoginResponse> {
  // Pegando os cookies da sessão não autenticada
  if (cookie == null) cookie = await getCookie();

  // Montando os dados para fazer uma nova requisição de login para autenticar o cookie de sessão
  const data = qs.stringify({
    GXState: `{"_EventName":"E'EVT_CONFIRMAR'.","_EventGridId":"","_EventRowId":"","MPW0005_CMPPGM":"login_top.aspx","MPW0005GX_FocusControl":"","vSAIDA":"","vREC_SIS_USUARIOID":"","GX_FocusControl":"vSIS_USUARIOID","GX_AJAX_KEY":"8C0897A1EC82946DB66C8388C4B78AD0","AJAX_SECURITY_TOKEN":"2AC665E5F5AF72AECB8F5559E88D8A7EC422284BECF3A408F75BE570EF181BD9","GX_CMP_OBJS":{"MPW0005":"login_top"},"sCallerURL":"","GX_RES_PROVIDER":"GXResourceProvider.aspx","GX_THEME":"GeneXusX","_MODE":"","Mode":"","IsModified":"1"}`,
    vSIS_USUARIOID: username,
    vSIS_USUARIOSENHA: password,
    BTCONFIRMA: "Confirmar",
  });

  // Fazendo uma nova requisição de login para autenticar o cookie de sessão
  const loginResponse = await axios.post(sigaEndpoint, data, {
    headers: {
      Cookie: cookie,
      "content-type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
  });

  // Pegando a pagina a resposta da requisição de login
  const responseDocument = parse(loginResponse.data);

  // Verificando se a página de resposta contém a palavra "home" no meta name="Description"
  const metaName = responseDocument.querySelector("meta[name=Description]");
  if (metaName == null)
    throw new Error("Não foi possível obter a meta tag Description");
  const metaNameContent = metaName.getAttribute("content");
  if (metaNameContent == null)
    throw new Error(
      "Não foi possível obter o conteúdo da meta tag Description",
    );
  if (metaNameContent.includes("home")) {
    // Se a página de resposta contém a palavra "home" no meta name="Description" então o login foi um sucesso
    return { cookie, parsedHtml: responseDocument };
  }
  throw new Error(
    "Não foi possível fazer login. Verifique os dados informados",
  );
}
