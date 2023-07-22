import { type HTMLElement } from "node-html-parser";
import { fetchFirstSpanText } from "../utils";
import { type StudentData } from "../types";

type HomePageParsed = StudentData;

export function parseHomePage(page: HTMLElement): HomePageParsed {
  const spans = page.querySelectorAll("span");

  const studentName = fetchFirstSpanText(spans, "PESSOALNOME")
    .replace("-", "")
    .trim();
  const collegeName = fetchFirstSpanText(spans, "UNIDADENOME");
  const courseName = fetchFirstSpanText(spans, "CURSONOME");
  const courseState = fetchFirstSpanText(spans, "SITUACAO");
  const coursePeriod = fetchFirstSpanText(spans, "PERIODODESCRICAO");
  const courseCycle = fetchFirstSpanText(spans, "ALUNOCURSOCICLOATUAL");
  const RA = fetchFirstSpanText(spans, "ALUNOCURSOREGISTROACADEMICOCURSO");
  const PP = fetchFirstSpanText(spans, "ALUNOCURSOINDICEPP");
  const PR = fetchFirstSpanText(spans, "vACD_ALUNOCURSOINDICEPR");
  const maxPR = fetchFirstSpanText(spans, "vMAX_ACD_ALUNOCURSOINDICEPR");
  const cursedSemesters = fetchFirstSpanText(spans, "SEMESTRESCURSADOS");
  const maxSemesters = fetchFirstSpanText(spans, "INTEGRALIZACAOMAX");
  const remainingSemesters = fetchFirstSpanText(spans, "FALTA");
  const institutionalEmail = fetchFirstSpanText(spans, "vINSTITUCIONALFATEC");
  const photoDiv = page
    .querySelectorAll("div")
    .filter((div) => div.getAttribute("id")?.includes("FOTO"))[0];
  let photoUrl = photoDiv.querySelector("img")?.getAttribute("src");

  if (photoUrl == null) throw new Error("A foto não foi encontrada.");

  photoUrl = photoUrl.replace("\\\\", "\\");

  return {
    studentName,
    collegeName,
    courseName,
    courseState,
    coursePeriod,
    courseCycle,
    RA,
    PP,
    PR,
    maxPR,
    cursedSemesters,
    maxSemesters,
    remainingSemesters,
    institutionalEmail,
    photoUrl,
  };
}
