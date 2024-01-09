interface Exercise {
    exercise: string;
    reps: string;
    weight: number;
  }
  
  export interface Day {
    dayNumber: number;
    plan: string;
    day: string;
    exercises: Exercise[];
  }
  
  export interface Program {
    week: number;
    days: Day[];
  }
  
  export const program: Program[] = [];
  
  const getWeight = (name: string, day: number): number => {
    const baseWeights: { [key: string]: number } = {
      squat: 45,
      bench_press: 45,
      barbell_row: 65,
      oh_press: 42.5,
      deadlift: day >= 29 ? 157.5 : 90 + day * (day >= 29 ? 2.5 : 5),
    };
  
    if (name in baseWeights) {
      return (
        baseWeights[name] +
        day *
          (name === "deadlift"
            ? day >= 29
              ? 2.5
              : 5
            : name === "bench_press"
            ? 2.5
            : 5)
      );
    } else {
      throw new Error(`Invalid Exercise name: ${name}`);
    }
  };
  
  const getPlanName = (week: number, day: number): string => {
    const planNames = ["a", "b"];
    return planNames[(week % 2) * 1 + (day % 2)];
  };
  
  const getDayName = (day: number): string => {
    const dayNames = ["Monday", "Wednesday", "Friday"];
    if (day >= 0 && day <= 2) {
      return dayNames[day];
    } else {
      throw new Error(`Invalid Day ${day}`);
    }
  };
  
  const getExerciseName = (plan: string, day: number): string => {
    const exercisesByDay: { [key: number]: string } = {
      0: "squat",
      1: plan === "a" ? "bench_press" : "oh_press",
      2: plan === "a" ? "barbell_row" : "deadlift",
    };
    return exercisesByDay[day % 3];
  };
  
  const getReps = (name: string): string => {
    return name === "deadlift" ? "1x5" : "5x5";
  };
  
  for (let week = 1; week <= 12; week++) {
    const days: Day[] = [];
  
    for (let day = 0; day < 3; day++) {
      const plan = getPlanName(week - 1, day);
      const dayName = getDayName(day);
      const exercises: Exercise[] = [];
  
      for (let exerciseIndex = 0; exerciseIndex < 3; exerciseIndex++) {
        const exerciseName = getExerciseName(plan, exerciseIndex);
        const reps = getReps(exerciseName);
        const weight = getWeight(exerciseName, week * day);
        exercises.push({ exercise: exerciseName, reps, weight });
      }
  
      days.push({ dayNumber: week * day, plan, day: dayName, exercises });
    }
  
    program.push({ week, days });
  }
  
  export const convertExerciseName = (name: string) => {
    switch (name) {
      case "squat":
        return "Squat";
      case "bench_press":
        return "Bench Press";
      case "barbell_row":
        return "Barbell Row";
      case "oh_press":
        return "Overhead Press";
      case "deadlift":
        return "Deadlift";
      default:
        throw Error(`Unknown name: $name`);
    }
  };
  