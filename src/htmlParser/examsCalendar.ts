import { type HTMLElement } from "node-html-parser";
import { type ExamSubject } from "../types";
import { fetchGXStateInputValue } from "../utils";

interface ParsedData {
  vACD_ALUNONOTASPARCIAISRESUMO_SDT: Array<{
    ACD_DisciplinaSigla: string;
    ACD_DisciplinaNome: string;
    Datas: Array<{
      ACD_AvaliacaoNome: string;
      ACD_AvaliacaoData: string;
    }>;
  }>;
}

export function parseExamsCalendarPage(page: HTMLElement): ExamSubject[] {
  const parsedData: ParsedData = fetchGXStateInputValue(page, (str) =>
    str.replaceAll(">", "\\>"),
  );

  return parsedData.vACD_ALUNONOTASPARCIAISRESUMO_SDT.map((subject) => {
    return {
      code: subject.ACD_DisciplinaSigla,
      name: subject.ACD_DisciplinaNome,
      exams: subject.Datas.map((exam) => {
        return {
          name: exam.ACD_AvaliacaoNome,
          date: exam.ACD_AvaliacaoData,
        };
      }),
    };
  });
}
