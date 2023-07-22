import axios from "axios";
import { type HTMLElement, parse } from "node-html-parser";

const sigaEndpoint = "https://siga.cps.sp.gov.br/ALUNO/notasparciais.aspx";

export interface RequestPartialNotesParams {
  cookie: string;
}

export interface RequestPartialNotesResponse {
  parsedHtml: HTMLElement;
}

export async function requestPartialNotes({
  cookie,
}: RequestPartialNotesParams): Promise<RequestPartialNotesResponse> {
  const response = await axios.get(sigaEndpoint, {
    headers: {
      Cookie: cookie,
    },
  });

  const responseDocument = parse(response.data);

  return { parsedHtml: responseDocument };
}
