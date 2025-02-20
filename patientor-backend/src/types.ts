import { z } from "zod";
import { NewEntrySchema } from "./utils";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type PatientWithoutSSN = Omit<Patient, "ssn">;
export type NewPatient = z.infer<typeof NewEntrySchema>;

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {
  id: string;
  description: string;
  creationDate: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry["code"]>;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
