import axios from "axios";
import { type HTMLElement, parse } from "node-html-parser";

const sigaEndpoint = "https://siga.cps.sp.gov.br/ALUNO/historico.aspx";

export interface RequestHistoryParams {
  cookie: string;
}

export interface RequestHistoryResponse {
  parsedHtml: HTMLElement;
}

export async function requestHistory({
  cookie,
}: RequestHistoryParams): Promise<RequestHistoryResponse> {
  const response = await axios.get(sigaEndpoint, {
    headers: {
      Cookie: cookie,
    },
  });

  const responseDocument = parse(response.data);

  return { parsedHtml: responseDocument };
}
