import { type HTMLElement } from "node-html-parser";
import { fetchGXStateInputValue, fetchSpanText } from "../utils";
import { type StudentData } from "../types";

type HomePageParsed = StudentData;

export function parseHomePage(page: HTMLElement): HomePageParsed {
  interface Node {
    Id: string;
    Name: string;
    Nodes?: Node[];
  }
  interface GXState {
    vTREENODECOLLECTIONDATA_MPAGE: Node[];
  }
  const gxState: GXState = fetchGXStateInputValue(page, (str) =>
    str.replaceAll(">", "\\>"),
  );

  let teachingPlans = gxState.vTREENODECOLLECTIONDATA_MPAGE[0].Nodes?.find(
    (node) => node.Id === "Planos de Ensino",
  )?.Nodes?.map((node) => {
    return {
      name: node.Name,
      id: node.Name.split("-")[0],
    };
  });

  if (teachingPlans == null) teachingPlans = [];

  const spans = page.querySelectorAll("span");

  const studentName = fetchSpanText(spans, "PESSOALNOME")
    .replace("-", "")
    .trim();
  const collegeName = fetchSpanText(spans, "UNIDADENOME");
  const courseName = fetchSpanText(spans, "CURSONOME");
  const courseState = fetchSpanText(spans, "SITUACAO");
  const coursePeriod = fetchSpanText(spans, "PERIODODESCRICAO");
  const courseCycle = fetchSpanText(spans, "ALUNOCURSOCICLOATUAL");
  const RA = fetchSpanText(spans, "ALUNOCURSOREGISTROACADEMICOCURSO");
  const PP = fetchSpanText(spans, "ALUNOCURSOINDICEPP");
  const PR = fetchSpanText(spans, "vACD_ALUNOCURSOINDICEPR");
  const maxPR = fetchSpanText(spans, "vMAX_ACD_ALUNOCURSOINDICEPR");
  const cursedSemesters = fetchSpanText(spans, "SEMESTRESCURSADOS");
  const maxSemesters = fetchSpanText(spans, "INTEGRALIZACAOMAX");
  const remainingSemesters = fetchSpanText(spans, "FALTA");
  const institutionalEmail = fetchSpanText(spans, "vINSTITUCIONALFATEC");
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
    teachingPlans,
  };
}
