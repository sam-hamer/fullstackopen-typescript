import express, { Request, Response, NextFunction } from "express";
import patientsService from "../services/patientsService";
import { PatientWithoutSSN, Patient, NewPatient } from "../types";
import { NewEntrySchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSSN[]>) => {
  res.send(patientsService.getPatientsWithoutSSN());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    console.log(error.issues);
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedEntry = patientsService.addPatient(req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
