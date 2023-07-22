import { type HTMLElement } from "node-html-parser";
import { type Subject } from "../types";
import { fetchGXStateInputValue } from "../utils";

export interface HistoryPageParsed {
  subjects: Subject[];
}

export function parseHistoryPage(page: HTMLElement): HistoryPageParsed {
  const parsedData = fetchGXStateInputValue(page);

  const subjects: Subject[] = parsedData.vALU_ALUNOHISTORICO_SDT.map(
    (subject: any) => {
      const code = subject.ACD_DisciplinaSigla;
      const name = subject.ACD_DisciplinaNome;
      const period = String(subject.ACD_AlunoHistoricoPeriodoOferecimentoId);
      const approved = subject.ACD_AlunoHistoricoAprovada;
      const average = String(subject.ACD_AlunoHistoricoMediaFinal);
      const frequency = String(subject.ACD_AlunoHistoricoFrequencia);
      const observation = subject.GER_TipoObservacaoHistoricoDescricao;

      return {
        code,
        name,
        period,
        approved,
        average,
        frequency,
        observation,
      };
    },
  );

  return {
    subjects,
  };
}
