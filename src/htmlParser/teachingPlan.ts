import { type HTMLElement } from "node-html-parser";
import { fetchSpanText } from "../utils";
import { type TeachingPlan } from "../types";

export function parseTeachingPlanPage(html: HTMLElement): TeachingPlan {
  const spans = html.querySelectorAll("span");
  const subjectName = fetchSpanText(spans, "vACD_DISCIPLINANOME");
  const subjectCode = fetchSpanText(spans, "vSHOW_ACD_DISCIPLINASIGLA");
  const classLetter = fetchSpanText(spans, "vACD_TURMALETRA");
  const professorName = fetchSpanText(spans, "vPRO_PESSOALNOME", 1);
  const periodOfOffer = fetchSpanText(spans, "vACD_PERIODOOFERECIMENTOID");
  const subjectSyllabus = fetchSpanText(spans, "vACD_DISCIPLINAEMENTA");
  const subjectObjective = fetchSpanText(spans, "vACD_DISCIPLINAOBJETIVO");
  const subjectWeekLoad = fetchSpanText(spans, "vACD_DISCIPLINAAULASSEMANAIS");
  const subjectTheoreticalLoad = fetchSpanText(
    spans,
    "vACD_DISCIPLINAAULASTEORICAS",
  );
  const subjectPracticalLoad = fetchSpanText(
    spans,
    "vACD_DISCIPLINAAULASPRATICAS",
  );
  const subjectTotalLoad = fetchSpanText(
    spans,
    "vACD_DISCIPLINAAULASTOTAISPERIODO",
  );

  return {
    subjectName,
    subjectCode,
    classLetter,
    professorName,
    periodOfOffer,
    subjectSyllabus,
    subjectObjective,
    subjectWeekLoad,
    subjectTheoreticalLoad,
    subjectPracticalLoad,
    subjectTotalLoad,
  };
}
