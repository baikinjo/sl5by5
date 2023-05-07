let last = 0;
export const program = [];

const getWeight = (name, day) => {
  let start = day >= 29 ? 157.5 : 90;
  let multiplier = day >= 29 ? 2.5 : 5;
  switch (name) {
    case "squat":
      return 45 + day * 5;
    case "bench_press":
      return 45 + day * 2.5;
    case "barbell_row":
      return 65 + day * 2.5;
    case "oh_press":
      return 42.5 + day * 2.5;
    case "deadlift":
      return start + day * multiplier;
    default:
      throw Error(`Invalid Excercise name: ${name}`);
  }
};

const getPlanName = (week, day) => {
  if (week % 2 === 0) {
    return day % 2 === 0 ? "a" : "b";
  } else {
    return day % 2 === 0 ? "b" : "a";
  }
};

const getDayName = (day) => {
  if (day % 3 === 0) return "monday";
  if (day % 3 === 1) return "wednesday";
  if (day % 3 === 2) return "friday";
  throw Error(`Invalid Day ${day}`);
};

const getExerciseName = (plan, day) => {
  if (day % 3 === 0) return "squat";
  if (day % 3 === 1) return plan === "a" ? "bench_press" : "oh_press";
  if (day % 3 === 2) return plan === "a" ? "barbell_row" : "deadlift";
  throw Error(`Wrong plan or day: plan: ${plan}, day: ${day}`);
};

const getReps = (name) => {
  return name === "deadlift" ? "1x5" : "5x5";
};

for (let i = 0; i < 12; i++) {
  const week = i + 1;
  const days = [];
  for (let j = 0; j < 3; j++) {
    const plan = getPlanName(i, j);
    const day = getDayName(j);
    const exercises = [];
    for (let k = 0; k < 3; k++) {
      const exercise = getExerciseName(plan, k);
      const reps = getReps(exercise);
      const weight = getWeight(exercise, last);
      exercises.push({
        exercise,
        reps,
        weight
      });
    }
    days.push({
      dayNumber: last,
      plan,
      day,
      exercises
    });
    last++;
  }
  program.push({
    week,
    days
  });
}
