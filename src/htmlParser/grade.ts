import { type HTMLElement } from "node-html-parser";
import { fetchGXStateInputValue } from "../utils";
import { type ClassOfDay, type Grade, type GradeSubject } from "../types";

export type GradeParsedPage = Grade;

function parseClassOfDay(bruteClassOfDayData: any): ClassOfDay[] {
  const numberOfClasses = bruteClassOfDayData.Count;
  const classes = [];
  for (let i = 0; i < numberOfClasses; i++) {
    const bruteClassData = bruteClassOfDayData[i];
    const classTime = bruteClassData.Props[1][1];
    const classCode = bruteClassData.Props[2][1];
    classes.push({ classTime, classCode });
  }
  return classes;
}

function parseSubjects(bruteSubjectsData: any): GradeSubject[] {
  const numberOfSubjects = bruteSubjectsData.Count;
  const subjects = [];

  for (let i = 0; i < numberOfSubjects; i++) {
    const bruteSubjectData = bruteSubjectsData[i];
    const code = bruteSubjectData.Props[0][1];
    const name = bruteSubjectData.Props[1][1];
    let classA = bruteSubjectData.Props[2][1];
    const teacher = bruteSubjectData.Props[3][1];

    if (classA == null && i >= 1) {
      classA = subjects[i - 1].class;
    }

    subjects.push({ code, name, class: classA, teacher });
  }
  return subjects;
}

export function parseGradePage(page: HTMLElement): GradeParsedPage {
  const parsedData = fetchGXStateInputValue(page, (str) =>
    str.replaceAll(">", "\\>"),
  );

  const subjects = parseSubjects(JSON.parse(parsedData.Grid1ContainerData));

  const classesMonday = parseClassOfDay(
    JSON.parse(parsedData.Grid2ContainerData),
  );
  const classesTuesday = parseClassOfDay(
    JSON.parse(parsedData.Grid3ContainerData),
  );
  const classesWednesday = parseClassOfDay(
    JSON.parse(parsedData.Grid4ContainerData),
  );
  const classesThursday = parseClassOfDay(
    JSON.parse(parsedData.Grid5ContainerData),
  );
  const classesFriday = parseClassOfDay(
    JSON.parse(parsedData.Grid6ContainerData),
  );
  const classesSaturday = parseClassOfDay(
    JSON.parse(parsedData.Grid7ContainerData),
  );

  return {
    subjects,
    daysOfWeek: {
      monday: classesMonday,
      tuesday: classesTuesday,
      wednesday: classesWednesday,
      thursday: classesThursday,
      friday: classesFriday,
      saturday: classesSaturday,
    },
  };
}
