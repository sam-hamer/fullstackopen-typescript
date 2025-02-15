import { NewPatient, Gender } from "./types";
import { z } from "zod";

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  ssn: z.string(),
});
const toNewPatientEntry = (object: unknown): NewPatient => {
  return NewEntrySchema.parse(object);
};

export default toNewPatientEntry;
