import patientsData from "../data/patients";
import { Patient, PatientWithoutSSN } from "../types";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};
const getPatientsWithoutSSN = (): PatientWithoutSSN[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patients.map(({ ssn, ...rest }) => rest);
};

export default { getPatients, getPatientsWithoutSSN };
