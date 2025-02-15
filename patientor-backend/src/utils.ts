import { NewPatient, Gender } from "./types";

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Invalid data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newEntry: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Invalid name");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Invalid date");
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Invalid gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Invalid occupation");
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Invalid ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default toNewPatientEntry;
