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
      return "";
  }
};

export const exerciseMedia = (name: string) => {
  switch (name) {
    case "squat":
      return "https://stronglifts.com/wp-content/uploads/how-to-squat.webp";
    case "bench_press":
      return "https://stronglifts.com/wp-content/uploads/how-to-bench-press.webp";
    case "barbell_row":
      return "https://stronglifts.com/wp-content/uploads/how-to-barbell-row.webp";
    case "oh_press":
      return "https://stronglifts.com/wp-content/uploads/how-to-overhead-press.webp";
    case "deadlift":
      return "https://stronglifts.com/wp-content/uploads/how-to-deadlift.webp";
    default:
      return "";
  }
};
