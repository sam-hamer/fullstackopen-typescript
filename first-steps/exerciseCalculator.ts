interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  hours: number[],
  target: number
): TrainingResult => {
  const totalHours = hours.reduce((sum, hours) => sum + hours, 0);
  const averageHours = totalHours / hours.length;
  const success = averageHours >= target;
  let rating = 0;
  let ratingDescription = "";

  if (success) {
    rating = 3;
    ratingDescription = "You accomplished your goal!";
  } else if (averageHours >= target * 0.8) {
    rating = 2;
    ratingDescription = "You almost reached your goal!";
  } else {
    rating = 1;
    ratingDescription = "You need to work harder";
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((hours) => hours > 0).length,
    success,
    rating,
    ratingDescription,
    target,
    average: averageHours,
  };
};

if (require.main === module) {
  const target = Number(process.argv[2]);
  const hours = process.argv.slice(3).map(Number);

  if (isNaN(target) || hours.some(isNaN)) {
    console.log("Invalid input, must be numbers");
  } else {
    console.log(calculateExercises(hours, target));
  }
}

export default calculateExercises;
