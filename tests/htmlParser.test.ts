import { readFileSync } from "fs";
import parse from "node-html-parser";

import * as htmlParser from "../src/htmlParser";

describe("HtmlParser", () => {
  it("Fazendo captura de dados da página de home", () => {
    const html = readFileSync("tests/html/home.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parseHomePage(parsedHtml);

    expect(result).toHaveProperty("studentName");
    expect(result.studentName).toBe("GUILHERME DA SILVA BENEVIDES");
    expect(result).toHaveProperty("collegeName");
    expect(result.collegeName).toBe(
      "Faculdade de Tecnologia de Mogi das Cruzes",
    );
    expect(result).toHaveProperty("courseName");
    expect(result.courseName).toBe(
      "Tecnologia em Análise e Desenvolvimento de Sistemas",
    );
    expect(result).toHaveProperty("courseState");
    expect(result.courseState).toBe("Em Curso");
    expect(result).toHaveProperty("coursePeriod");
    expect(result.coursePeriod).toBe("Tarde");
    expect(result).toHaveProperty("courseCycle");
    expect(result.courseCycle).toBe("5");
    expect(result).toHaveProperty("RA");
    expect(result.RA).toBe("0256859832458");
    expect(result).toHaveProperty("PP");
    expect(result.PP).toBe("69.04");
    expect(result).toHaveProperty("PR");
    expect(result.PR).toBe("8.93");
    expect(result).toHaveProperty("maxPR");
    expect(result.maxPR).toBe("0.00");
    expect(result).toHaveProperty("cursedSemesters");
    expect(result.cursedSemesters).toBe("4");
    expect(result).toHaveProperty("maxSemesters");
    expect(result.maxSemesters).toBe("10");
    expect(result).toHaveProperty("remainingSemesters");
    expect(result.remainingSemesters).toBe("6");
    expect(result).toHaveProperty("institutionalEmail");
    expect(result.institutionalEmail).toBe(
      "guilherme.benevides@fatec.sp.gov.br",
    );
    expect(result).toHaveProperty("photoUrl");
    expect(result.photoUrl).toBe(
      "https:\\siga.cps.sp.gov.br/image//Q6J4I4ZLWVJXSC3Y2PJ3MGJQYD5DZW.TMB.JPG",
    );
  });
  it("Fazendo captura de dados da página de home: problema de foto", () => {
    const html = readFileSync("tests/html/home1.html", "utf-8");
    const parsedHtml = parse(html);
    // expect(()=>htmlParser.parseHomePage(parsedHtml)).toThrow(Error);
    expect(() => htmlParser.parseHomePage(parsedHtml)).toThrow(
      "A foto não foi encontrada.",
    );
  });

  it("Fazendo captura de dados da página de histórico", () => {
    const html = readFileSync("tests/html/history.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parseHistoryPage(parsedHtml);
    const content = JSON.parse(
      readFileSync("tests/json/history.json", "utf-8").toString(),
    );
    expect(result).toMatchObject(content);
  });

  it("Fazendo captura de dados da página de histórico: problema de input", () => {
    const html = readFileSync("tests/html/history1.html", "utf-8");
    const parsedHtml = parse(html);
    expect(() => htmlParser.parseHistoryPage(parsedHtml)).toThrow(
      "Não foi possível encontrar o valor do input GXState",
    );
  });

  it("Fazendo captura de dados da página de histórico: problema de input", () => {
    const html = readFileSync("tests/html/history2.html", "utf-8");
    const parsedHtml = parse(html);
    expect(() => htmlParser.parseHistoryPage(parsedHtml)).toThrow(
      "Não foi possível encontrar o input GXState",
    );
  });

  it("Fazendo captura de dados da página de horarios", () => {
    const html = readFileSync("tests/html/grade.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parseGradePage(parsedHtml);
    const content = JSON.parse(
      readFileSync("tests/json/grade.json", "utf-8").toString(),
    );
    expect(result).toMatchObject(content);
  });

  it("Fazendo captura de dados da página de faltas parciais", () => {
    const html = readFileSync("tests/html/partialAbsences.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parsePartialAbsencesPage(parsedHtml);
    const content = JSON.parse(
      readFileSync("tests/json/partialAbsences.json", "utf-8").toString(),
    );
    expect(result).toMatchObject(content);
  });

  it("Fazendo captura de dados da página de notas parciais", () => {
    const html = readFileSync("tests/html/partialNotes.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parsePartialNotesPage(parsedHtml);
    const content = JSON.parse(
      readFileSync("tests/json/partialNotes.json", "utf-8").toString(),
    );
    expect(result).toMatchObject(content);
  });

  it("Fazendo captura de dados da página de calendário de provas", () => {
    const html = readFileSync("tests/html/examsCalendar.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parseExamsCalendarPage(parsedHtml);
    const content = JSON.parse(
      readFileSync("tests/json/examsCalendar.json", "utf-8").toString(),
    );
    expect(result).toMatchObject(content);
  });

  it("Fazendo captura de dados da página de plano de ensino", () => {
    const html = readFileSync("tests/html/teachingPlan.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parseTeachingPlanPage(parsedHtml);
    const content = JSON.parse(
      readFileSync("tests/json/teachingPlan.json", "utf-8").toString(),
    );
    expect(result).toMatchObject(content);
  });
});
