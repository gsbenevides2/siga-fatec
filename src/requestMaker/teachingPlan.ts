import axios from "axios";
import { type HTMLElement, parse } from "node-html-parser";

const sigaEndpoint = "https://siga.cps.sp.gov.br/ALUNO/planoensino.aspx";

export interface RequestTeachingPlanParams {
  cookie: string;
  code: string;
}

export interface RequestTeachingPlanResponse {
  parsedHtml: HTMLElement;
}

export async function requestTeachingPlan({
  cookie,
  code,
}: RequestTeachingPlanParams): Promise<RequestTeachingPlanResponse> {
  const response = await axios.get(sigaEndpoint + "?" + code, {
    headers: {
      Cookie: cookie,
    },
    withCredentials: true,
  });

  const responseDocument = parse(response.data);

  return { parsedHtml: responseDocument };
}
