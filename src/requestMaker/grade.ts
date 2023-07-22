import axios from "axios";
import { type HTMLElement, parse } from "node-html-parser";

const sigaEndpoint = "https://siga.cps.sp.gov.br/ALUNO/horario.aspx";

export interface RequestGradeParams {
  cookie: string;
}

export interface RequestGradeResponse {
  parsedHtml: HTMLElement;
}

export async function requestGrade({
  cookie,
}: RequestGradeParams): Promise<RequestGradeResponse> {
  const response = await axios.get(sigaEndpoint, {
    headers: {
      Cookie: cookie,
    },
  });

  const responseDocument = parse(response.data);

  return { parsedHtml: responseDocument };
}
