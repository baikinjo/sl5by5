type Exercise = {
  exercise: string;
  reps: string;
  weight: number;
};

export type Day = {
  dayNumber: number;
  plan: string;
  day: string;
  exercises: Exercise[];
};

export type Program = {
  week: number;
  days: Day[];
};
