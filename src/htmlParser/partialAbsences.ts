import { type HTMLElement } from "node-html-parser";
import { fetchGXStateInputValue } from "../utils";
import { type PartialAbsence } from "../types";

interface ParsedPartialAbsences {
  subjects: PartialAbsence[];
}

export function parsePartialAbsencesPage(
  html: HTMLElement,
): ParsedPartialAbsences {
  const gxState = fetchGXStateInputValue(html, (str) =>
    str.replaceAll(">", "\\>"),
  );
  const subjects = gxState.vFALTAS.map((subjectBrute: any) => {
    const code = subjectBrute.ACD_DisciplinaSigla.trim();
    const subject = subjectBrute.ACD_DisciplinaNome;
    const presence = subjectBrute.TotalPresencas;
    const absence = subjectBrute.TotalAusencias;
    return { code, subject, presence, absence };
  });

  return {
    subjects,
  };
}
