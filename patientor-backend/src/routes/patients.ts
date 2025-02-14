import express from "express";
import patientsService from "../services/patientsService";
import { PatientWithoutSSN } from "../types";
import { Response } from "express";
const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSSN[]>) => {
  res.send(patientsService.getPatientsWithoutSSN());
});

export default router;
