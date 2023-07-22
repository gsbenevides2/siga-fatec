import axios from "axios";
import { type HTMLElement, parse } from "node-html-parser";

const sigaEndpoint = "https://siga.cps.sp.gov.br/ALUNO/faltasparciais.aspx";

export interface RequestPartialAbsencesParams {
  cookie: string;
}

export interface RequestPartialAbsencesResponse {
  parsedHtml: HTMLElement;
}

export async function requestPartialAbsences({
  cookie,
}: RequestPartialAbsencesParams): Promise<RequestPartialAbsencesResponse> {
  const response = await axios.get(sigaEndpoint, {
    headers: {
      Cookie: cookie,
    },
  });

  const responseDocument = parse(response.data);

  return { parsedHtml: responseDocument };
}
