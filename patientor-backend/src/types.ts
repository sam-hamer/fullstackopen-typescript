export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type PatientWithoutSSN = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, "id">;

export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}
