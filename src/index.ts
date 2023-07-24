import {
  type Subject,
  type StudentData,
  type PartialAbsence,
  type Grade,
  type PartialNoteSubject,
  type LoginParams,
} from "./types";
import * as requestMaker from "./requestMaker";
import * as htmlParser from "./htmlParser";

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
    cookie,
  }: LoginParams): Promise<Siga> {
    const response = await requestMaker.requestLogin({
      username,
      password,
      cookie,
    });
    const studentData = htmlParser.parseHomePage(response.parsedHtml);
    return new Siga(response.cookie, studentData);
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
