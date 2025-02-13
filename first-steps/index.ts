import express from "express";
import calculateBmi from "./calculateBmi";
import exerciseCalculator from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  res.send({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as {
    daily_exercises: number[];
    target: number;
  };
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" });
  }
  if (isNaN(target) || daily_exercises.some(isNaN)) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  const result = exerciseCalculator(daily_exercises, target);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
