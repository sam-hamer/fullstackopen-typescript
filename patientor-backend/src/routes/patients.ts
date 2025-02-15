import express from "express";
import patientsService from "../services/patientsService";
import { PatientWithoutSSN } from "../types";
import { Response } from "express";
import toNewPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSSN[]>) => {
  res.send(patientsService.getPatientsWithoutSSN());
});

router.post("/", (_req, res: Response) => {
  try {
    const newPatient = toNewPatientEntry(_req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
