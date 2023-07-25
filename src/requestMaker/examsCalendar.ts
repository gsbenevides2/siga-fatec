import axios from "axios";
import { type HTMLElement, parse } from "node-html-parser";

const sigaEndpoint = "https://siga.cps.sp.gov.br/ALUNO/calendarioprovas.aspx";

export interface RequestExamsCalendarParams {
  cookie: string;
}

export interface RequestExamsCalendarResponse {
  parsedHtml: HTMLElement;
}

export async function requestExamsCalendar({
  cookie,
}: RequestExamsCalendarParams): Promise<RequestExamsCalendarResponse> {
  const response = await axios.get(sigaEndpoint, {
    headers: {
      Cookie: cookie,
    },
    withCredentials: true,
  });

  const responseDocument = parse(response.data);

  return { parsedHtml: responseDocument };
}
