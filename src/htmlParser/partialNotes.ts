import { type HTMLElement } from "node-html-parser";
import { fetchGXStateInputValue } from "../utils";
import { type PartialNoteSubject } from "../types";

interface ParsedPartialNotesPage {
  subjects: PartialNoteSubject[];
}

function parseSubject(subjectBrute: any): PartialNoteSubject {
  const code = subjectBrute.ACD_DisciplinaSigla;
  const subject = subjectBrute.ACD_DisciplinaNome;
  const finalMedia = subjectBrute.ACD_AlunoHistoricoItemMediaFinal;
  const numberAbsences = subjectBrute.ACD_AlunoHistoricoItemQtdFaltas;
  const frequency = subjectBrute.ACD_AlunoHistoricoItemFrequencia;
  return {
    code,
    subject,
    finalMedia,
    numberAbsences,
    frequency,
  };
}

export function parsePartialNotesPage(
  html: HTMLElement,
): ParsedPartialNotesPage {
  const gxState = fetchGXStateInputValue(html); // , (str) =>
  const subjects = gxState.vACD_ALUNONOTASPARCIAISRESUMO_SDT.map(parseSubject);
  /*
  const input = html.querySelector("input[name='GXState']");
  const value = input?.getAttribute("value");
  writeFileSync("partialNotes.json", value ?? "");
*/
  return {
    subjects,
  };
}
