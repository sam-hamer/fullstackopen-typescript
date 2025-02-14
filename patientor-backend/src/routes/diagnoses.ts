import express from "express";
import diagnosesService from "../services/diagnosesService";
const router = express.Router();
import { Response } from "express";
import { DiagnosisEntry } from "../types";

router.get("/", (_req, res: Response<DiagnosisEntry[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;
