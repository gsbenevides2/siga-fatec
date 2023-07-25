import axios from "axios";
import * as requestMaker from "../src/requestMaker";
import MockAdapter from "axios-mock-adapter";
import { readFileSync } from "fs";

const username = "33429664675";
const password = "Se eu soubesse que ia ser assim, tinha ficado em casa";

const mock = new MockAdapter(axios);
const sigaAlunoEndpoint = "https://siga.cps.sp.gov.br/ALUNO/login.aspx";
const sigaHistoricoEndpoint = "https://siga.cps.sp.gov.br/ALUNO/historico.aspx";
const sigaNotasParciaisEndpoint =
  "https://siga.cps.sp.gov.br/ALUNO/notasparciais.aspx";
const sigaFaltasParciaisEndpoint =
  "https://siga.cps.sp.gov.br/ALUNO/faltasparciais.aspx";
const sigaHorarioEndpoint = "https://siga.cps.sp.gov.br/ALUNO/horario.aspx";
const cookie = ["ASP.NET_SessionId=1234567890; path=/; HttpOnly"];

describe("RequestMaker", () => {
  it("Esperando que o login seja um sucesso", async () => {
    mock.onGet(sigaAlunoEndpoint).reply(200, "", {
      "set-cookie": cookie,
    });

    mock
      .onPost(sigaAlunoEndpoint)
      .reply(200, readFileSync("tests/html/home.html", "utf-8").toString());

    const sessionData = await requestMaker.requestLogin({
      username,
      password,
    });

    expect(sessionData).toHaveProperty("cookie");
    expect(sessionData.cookie).toMatch(/ASP.NET_SessionId=.+?;/);
    expect(sessionData).toHaveProperty("parsedHtml");
    expect(sessionData.parsedHtml).toHaveProperty("querySelector");
  });

  it("Esperando que o login seja um erro: sem cookies de sessão", async () => {
    mock.onGet(sigaAlunoEndpoint).reply(200, "", {});
    await expect(
      requestMaker.requestLogin({
        username,
        password,
      }),
    ).rejects.toThrowError("Não foi possível obter os cookies");
  });

  it("Esperando que o login seja um erro: sem meta tag Description", async () => {
    mock.onGet(sigaAlunoEndpoint).reply(200, "", {
      "set-cookie": cookie,
    });

    mock
      .onPost(sigaAlunoEndpoint)
      .reply(200, readFileSync("tests/html/login1.html", "utf-8").toString());

    await expect(
      requestMaker.requestLogin({
        username,
        password,
      }),
    ).rejects.toThrowError("Não foi possível obter a meta tag Description");
  });

  it("Esperando que o login seja um erro: sem conteúdo na meta tag Description", async () => {
    mock.onGet(sigaAlunoEndpoint).reply(200, "", {
      "set-cookie": cookie,
    });

    mock
      .onPost(sigaAlunoEndpoint)
      .reply(200, readFileSync("tests/html/login2.html", "utf-8").toString());

    await expect(
      requestMaker.requestLogin({
        username,
        password,
      }),
    ).rejects.toThrowError(
      "Não foi possível obter o conteúdo da meta tag Description",
    );
  });

  it("Esperando que o login seja um erro: sem a palavra 'home' na meta tag Description ou seja dados incorretos", async () => {
    mock.onGet(sigaAlunoEndpoint).reply(200, "", {
      "set-cookie": cookie,
    });

    mock
      .onPost(sigaAlunoEndpoint)
      .reply(200, readFileSync("tests/html/login.html", "utf-8").toString());

    await expect(
      requestMaker.requestLogin({
        username,
        password,
      }),
    ).rejects.toThrowError(
      "Não foi possível fazer login. Verifique os dados informados",
    );
  });

  it("Esperando que a requisção ao histórico seja um sucesso", async () => {
    mock
      .onGet(sigaHistoricoEndpoint)
      .reply(200, readFileSync("tests/html/history.html", "utf-8").toString());

    const historyData = await requestMaker.requestHistory({
      cookie: cookie[0],
    });

    expect(historyData).toHaveProperty("parsedHtml");
    expect(historyData.parsedHtml).toHaveProperty("querySelector");
  });

  it("Esperando que a requisção ao notas parciais seja um sucesso", async () => {
    mock
      .onGet(sigaNotasParciaisEndpoint)
      .reply(
        200,
        readFileSync("tests/html/partialNotes.html", "utf-8").toString(),
      );

    const partialNotesData = await requestMaker.requestPartialNotes({
      cookie: cookie[0],
    });

    expect(partialNotesData).toHaveProperty("parsedHtml");
    expect(partialNotesData.parsedHtml).toHaveProperty("querySelector");
  });

  it("Esperando que a requisção ao faltas parciais seja um sucesso", async () => {
    mock
      .onGet(sigaFaltasParciaisEndpoint)
      .reply(
        200,
        readFileSync("tests/html/partialAbsences.html", "utf-8").toString(),
      );

    const partialAbsencesData = await requestMaker.requestPartialAbsences({
      cookie: cookie[0],
    });

    expect(partialAbsencesData).toHaveProperty("parsedHtml");
    expect(partialAbsencesData.parsedHtml).toHaveProperty("querySelector");
  });

  it("Esperando que a requisção ao horario seja um sucesso", async () => {
    const cookie = "ASP.NET_SessionId=1234567890; path=/; HttpOnly";
    mock
      .onGet(sigaHorarioEndpoint)
      .reply(200, readFileSync("tests/html/grade.html", "utf-8").toString());

    const fullHistoryData = await requestMaker.requestGrade({
      cookie: cookie[0],
    });

    expect(fullHistoryData).toHaveProperty("parsedHtml");
    expect(fullHistoryData.parsedHtml).toHaveProperty("querySelector");
  });

  /*
  it("Esperando que a requisição a página de calendário de provas seja um sucesso", async () => {
    const cookie = "ASP.NET_SessionId=1234567890; path=/; HttpOnly";
    mock
      .onGet(sigaHorarioEndpoint)
      .reply(200, readFileSync("tests/html/grade.html", "utf-8").toString());

    const fullHistoryData = await requestMaker.requestGrade({ cookie });

    expect(fullHistoryData).toHaveProperty("parsedHtml");
    expect(fullHistoryData.parsedHtml).toHaveProperty("querySelector");
  });
  */
});
