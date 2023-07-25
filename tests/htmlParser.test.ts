import { readFileSync } from "fs";
import parse from "node-html-parser";

import * as htmlParser from "../src/htmlParser";

describe("HtmlParser", () => {
  it("Fazendo captura de dados da página de home", () => {
    const html = readFileSync("tests/html/home.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parseHomePage(parsedHtml);
    const content = JSON.parse(
      readFileSync("tests/json/home.json", "utf-8").toString(),
    );
    expect(result).toMatchObject(content);
  });
  it("Fazendo captura de dados da página de home: problema de foto", () => {
    const html = readFileSync("tests/html/home1.html", "utf-8");
    const parsedHtml = parse(html);
    // expect(()=>htmlParser.parseHomePage(parsedHtml)).toThrow(Error);
    expect(() => htmlParser.parseHomePage(parsedHtml)).toThrow(
      "A foto não foi encontrada.",
    );
  });
  it("Fazendo captura de dados da página de home: problema de nodes", () => {
    const html = readFileSync("tests/html/home3.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parseHomePage(parsedHtml);
    expect(result.teachingPlans).toMatchObject([]);
  });
  it("Fazendo captura de dados da página de home: problema de nodes", () => {
    const html = readFileSync("tests/html/home4.html", "utf-8");
    const parsedHtml = parse(html);
    const result = htmlParser.parseHomePage(parsedHtml);
    expect(result.teachingPlans).toMatchObject([]);
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
