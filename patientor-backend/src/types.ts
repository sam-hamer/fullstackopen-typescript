export type Gender = "male" | "female" | "other";
export type PatientWithoutSSN = Omit<Patient, "ssn">;

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
