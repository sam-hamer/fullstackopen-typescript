import patientsData from "../data/patients";
import { Patient, PatientWithoutSSN, NewPatient } from "../types";
import { v1 as uuid } from "uuid";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => rest);
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    ...patient,
    id: uuid(),
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientsWithoutSSN, addPatient, getPatient };
