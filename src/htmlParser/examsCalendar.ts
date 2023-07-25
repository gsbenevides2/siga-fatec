import { type HTMLElement } from "node-html-parser";
import { type ExamsCalendar } from "../types";
import { fetchGXStateInputValue } from "../utils";

export function parseExamsCalendarPage(page: HTMLElement): ExamsCalendar {
  const parsedData = fetchGXStateInputValue(page, (str) =>
    str.replaceAll(">", "\\>"),
  );

  return parsedData.vACD_ALUNONOTASPARCIAISRESUMO_SDT.map((subject: any) => {
    return {
      code: subject.ACD_DisciplinaSigla,
      name: subject.ACD_DisciplinaNome,
      exams: subject.Datas.map((exam: any) => {
        return {
          name: exam.ACD_AvaliacaoNome,
          date: exam.ACD_AvaliacaoData,
        };
      }),
    };
  });
}
