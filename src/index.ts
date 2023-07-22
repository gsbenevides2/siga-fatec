import {
  type Subject,
  type StudentData,
  type PartialAbsence,
  type Grade,
  type PartialNoteSubject,
} from "./types";
import * as requestMaker from "./requestMaker";
import * as htmlParser from "./htmlParser";

interface LoginParams {
  username: string;
  password: string;
}

export class Siga {
  private readonly cookie: string;
  private readonly studentData: StudentData;

  private constructor(cookie: string, studentData: StudentData) {
    this.cookie = cookie;
    this.studentData = studentData;
  }

  public static async login({
    username,
    password,
  }: LoginParams): Promise<Siga> {
    const { cookies, parsedHtml } = await requestMaker.requestLogin({
      username,
      password,
    });
    const studentData = htmlParser.parseHomePage(parsedHtml);
    return new Siga(cookies[0], studentData);
  }

  public getStudentData(): StudentData {
    return this.studentData;
  }

  public async getHistory(): Promise<Subject[]> {
    const { parsedHtml } = await requestMaker.requestHistory({
      cookie: this.cookie,
    });
    const { subjects } = htmlParser.parseHistoryPage(parsedHtml);
    return subjects;
  }

  public async getPartialAbsences(): Promise<PartialAbsence[]> {
    const { parsedHtml } = await requestMaker.requestPartialAbsences({
      cookie: this.cookie,
    });
    const { subjects } = htmlParser.parsePartialAbsencesPage(parsedHtml);
    return subjects;
  }

  public async getGrade(): Promise<Grade> {
    const { parsedHtml } = await requestMaker.requestGrade({
      cookie: this.cookie,
    });
    const grade = htmlParser.parseGradePage(parsedHtml);
    return grade;
  }

  public async getPartialNotes(): Promise<PartialNoteSubject[]> {
    const { parsedHtml } = await requestMaker.requestPartialNotes({
      cookie: this.cookie,
    });
    const { subjects } = htmlParser.parsePartialNotesPage(parsedHtml);
    return subjects;
  }
}
