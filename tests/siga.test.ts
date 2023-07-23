import { Siga } from "../src";
import { config } from "dotenv";

config({
  path: ".env.test",
});

const { SIGA_USERNAME: username, SIGA_PASSWORD: password } = process.env as {
  SIGA_USERNAME: string;
  SIGA_PASSWORD: string;
};

const timeOut = 100000;

describe("Siga: Testes de integração", () => {
  it(
    "Esperando que o login seja um sucesso",
    async () => {
      const siga = await Siga.login({
        username,
        password,
      });

      const studentData = siga.getStudentData();

      expect(studentData.studentName).toBe("GUILHERME DA SILVA BENEVIDES");
    },
    timeOut,
  );

  it(
    "Esperando que o login seja um erro: senha incorreta",
    async () => {
      await expect(
        Siga.login({
          username,
          password: password + "1",
        }),
      ).rejects.toThrowError(
        "Não foi possível fazer login. Verifique os dados informados",
      );
    },
    timeOut,
  );

  it(
    "Esperando que retorne o histórico",
    async () => {
      const siga = await Siga.login({
        username,
        password,
      });

      const history = await siga.getHistory();

      expect(history.length).toBeGreaterThan(10);
    },
    timeOut * 2,
  );

  it(
    "Esperando que retorne as faltas parciais",
    async () => {
      const siga = await Siga.login({
        username,
        password,
      });

      const partialAbsences = await siga.getPartialAbsences();

      expect(partialAbsences.length).toBeGreaterThan(1);
    },
    timeOut * 2,
  );

  it(
    "Esperando que retorne as notas parciais",
    async () => {
      const siga = await Siga.login({
        username,
        password,
      });

      const partialNotes = await siga.getPartialNotes();

      expect(partialNotes.length).toBeGreaterThan(1);
    },
    timeOut * 2,
  );

  it(
    "Esperando que retorne o horário",
    async () => {
      const siga = await Siga.login({
        username,
        password,
      });

      const grade = await siga.getGrade();

      expect(grade.subjects.length).toBeGreaterThan(1);
    },
    timeOut * 2,
  );
});
