export interface StudentData {
  studentName: string;
  collegeName: string;
  courseName: string;
  courseState: string;
  coursePeriod: string;
  courseCycle: string;
  RA: string;
  PP: string;
  PR: string;
  maxPR: string;
  cursedSemesters: string;
  maxSemesters: string;
  remainingSemesters: string;
  institutionalEmail: string;
  photoUrl: string;
}

export interface Subject {
  code: string;
  name: string;
  period: string;
  approved: boolean;
  average: string;
  frequency: string;
  observation: string;
}

export interface PartialAbsence {
  code: string;
  subject: string;
  presence: string;
  absence: string;
}

export interface Grade {
  daysOfWeek: {
    monday: ClassOfDay[];
    tuesday: ClassOfDay[];
    wednesday: ClassOfDay[];
    thursday: ClassOfDay[];
    friday: ClassOfDay[];
    saturday: ClassOfDay[];
  };
  subjects: GradeSubject[];
}

export interface ClassOfDay {
  classTime: string;
  classCode: string;
}

export interface GradeSubject {
  code: string;
  name: string;
  class: string;
  teacher: string;
}

export interface PartialNoteSubject {
  code: string;
  subject: string;
  finalMedia: string;
  numberAbsences: string;
  frequency: string;
}

export interface LoginParams {
  username: string;
  password: string;
  cookie?: string;
}

export interface Exam {
  name: string;
  date: string;
}

export interface ExamSubject {
  code: string;
  name: string;
  exams: Exam[];
}

export interface ExamsCalendar {
  subjects: ExamSubject[];
}
