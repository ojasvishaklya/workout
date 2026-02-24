/**
 * Workout Routines
 * 
 * This file contains predefined workout routines that can be loaded in the app.
 * Each routine defines a set of workout days, and each day contains exercises with their set counts.
 * 
 * Format:
 * {
 *   "Day Name": [
 *     { name: "Exercise Name", sets: Number of sets },
 *     ...
 *   ],
 *   ...
 * }
 */

// Enum for muscle groups
const MuscleGroups = {
  UPPER_CHEST: "Upper Chest",
  FRONT_SHOULDERS: "Front Shoulders",
  TRICEPS: "Triceps",
  MID_CHEST: "Mid Chest",
  SIDE_SHOULDERS: "Side Shoulders",
  LATS: "Lats",
  BICEPS: "Biceps",
  LOWER_BACK: "Lower Back",
  GLUTES: "Glutes",
  HAMSTRINGS: "Hamstrings",
  TRAPS: "Traps",
  FOREARMS: "Forearms",
  GRIP: "Grip",
  QUADS: "Quads",
  CORE: "Core",
  CALVES: "Calves",
  ABS: "Abs",
  REAR_SHOULDERS: "Rear Shoulders",
  UPPER_BACK: "Upper Back",
  LOWER_CHEST: "Lower Chest"
};

const workoutRoutines = {
  // PPL (Push, Pull, Legs) Routine
  "PPL": {
    "Push A": [
      { name: "Incline Dumbbell Bench Press", sets: 4, muscles: [MuscleGroups.UPPER_CHEST, MuscleGroups.FRONT_SHOULDERS, MuscleGroups.TRICEPS] },
      { name: "Seated Chest Press", sets: 3, muscles: [MuscleGroups.MID_CHEST, MuscleGroups.TRICEPS] },
      { name: "Arnold Press", sets: 3, muscles: [MuscleGroups.FRONT_SHOULDERS, MuscleGroups.SIDE_SHOULDERS, MuscleGroups.TRICEPS] },
      { name: "Chest Fly", sets: 3, muscles: [MuscleGroups.MID_CHEST] },
      { name: "Dumbbell/Cable Lateral Raises", sets: 3, muscles: [MuscleGroups.SIDE_SHOULDERS] },
      { name: "Overhead Tricep Extension", sets: 3, muscles: [MuscleGroups.TRICEPS] },
      { name: "Tricep Pushdowns", sets: 3, muscles: [MuscleGroups.TRICEPS] }
    ],
    "Pull A": [
      { name: "Lat Pulldown / Weighted Chin-ups", sets: 4, muscles: [MuscleGroups.LATS, MuscleGroups.BICEPS] },
      { name: "Seated Cable Row / Barbell Row", sets: 3, muscles: [MuscleGroups.UPPER_BACK, MuscleGroups.LATS] },
      { name: "Lower Back Hyperextensions", sets: 3, muscles: [MuscleGroups.LOWER_BACK, MuscleGroups.GLUTES, MuscleGroups.HAMSTRINGS] },
      { name: "Shrugs", sets: 3, muscles: [MuscleGroups.TRAPS] },
      { name: "Incline Dumbbell Curls / Bayesian Curls", sets: 4, muscles: [MuscleGroups.BICEPS] },
      { name: "Preacher Curls / Spider Curls", sets: 3, muscles: [MuscleGroups.BICEPS] },
      { name: "Wrist Curls + Dead Hangs", sets: 3, muscles: [MuscleGroups.FOREARMS, MuscleGroups.GRIP] }
    ],
    "Legs A": [
      { name: "Barbell Squat", sets: 4, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES, MuscleGroups.CORE] },
      { name: "Hip Thrust", sets: 3, muscles: [MuscleGroups.GLUTES, MuscleGroups.HAMSTRINGS] },
      { name: "Leg Extensions", sets: 3, muscles: [MuscleGroups.QUADS] },
      { name: "Standing Calf Raises", sets: 4, muscles: [MuscleGroups.CALVES] },
      { name: "Weighted Crunches", sets: 3, muscles: [MuscleGroups.ABS] }
    ],
    "Push B": [
      { name: "Dumbbell Shoulder Press", sets: 3, muscles: [MuscleGroups.FRONT_SHOULDERS, MuscleGroups.SIDE_SHOULDERS, MuscleGroups.TRICEPS] },
      { name: "Flat Bench Press", sets: 3, muscles: [MuscleGroups.MID_CHEST, MuscleGroups.FRONT_SHOULDERS, MuscleGroups.TRICEPS] },
      { name: "Dumbbell/Cable Lateral Raises", sets: 3, muscles: [MuscleGroups.SIDE_SHOULDERS] },
      { name: "Incline Dumbbell Fly", sets: 3, muscles: [MuscleGroups.UPPER_CHEST] },
      { name: "Front Dumbbell/Cable Raise", sets: 3, muscles: [MuscleGroups.FRONT_SHOULDERS] },
      { name: "Skull Crushers", sets: 3, muscles: [MuscleGroups.TRICEPS] },
      { name: "Weighted Dips / Cable Kickbacks", sets: 3, muscles: [MuscleGroups.TRICEPS, MuscleGroups.LOWER_CHEST] }
    ],
    "Pull B": [
      { name: "Barbell Row (Overhand)", sets: 4, muscles: [MuscleGroups.UPPER_BACK, MuscleGroups.LATS] },
      { name: "Pull-ups (Close/Neutral Grip)", sets: 3, muscles: [MuscleGroups.LATS, MuscleGroups.BICEPS] },
      { name: "Rear Delt Fly / Face Pulls", sets: 3, muscles: [MuscleGroups.REAR_SHOULDERS, MuscleGroups.UPPER_BACK] },
      { name: "Cable Pullovers", sets: 3, muscles: [MuscleGroups.LATS] },
      { name: "Standing Cable Curls", sets: 4, muscles: [MuscleGroups.BICEPS] },
      { name: "Hammer Curls / Reverse Cable Curls", sets: 3, muscles: [MuscleGroups.BICEPS, MuscleGroups.FOREARMS] },
      { name: "Wrist Curls + Dead Hangs", sets: 3, muscles: [MuscleGroups.FOREARMS, MuscleGroups.GRIP] }
    ],
    "Legs B": [
      { name: "Leg Press", sets: 4, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES] },
      { name: "Romanian Deadlift (RDL)", sets: 3, muscles: [MuscleGroups.HAMSTRINGS, MuscleGroups.GLUTES, MuscleGroups.LOWER_BACK] },
      { name: "Dumbbell Lunges", sets: 3, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES, MuscleGroups.HAMSTRINGS] },
      { name: "Hamstring Curls", sets: 3, muscles: [MuscleGroups.HAMSTRINGS] },
      { name: "Seated Calf Raises", sets: 4, muscles: [MuscleGroups.CALVES] },
      { name: "Weighted Crunches", sets: 3, muscles: [MuscleGroups.ABS] }
    ]
  },

  // Upper/Lower Split Routine (4 days per week)
  "Upper/Lower": {
    "Upper A (Horizontal Focus)": [
      { name: "Flat Barbell Bench Press", sets: 4, muscles: [MuscleGroups.MID_CHEST, MuscleGroups.FRONT_SHOULDERS, MuscleGroups.TRICEPS] },
      { name: "Bent Over Barbell Row", sets: 4, muscles: [MuscleGroups.UPPER_BACK, MuscleGroups.LATS, MuscleGroups.BICEPS] },
      { name: "Incline Dumbbell Press", sets: 3, muscles: [MuscleGroups.UPPER_CHEST, MuscleGroups.FRONT_SHOULDERS] },
      { name: "Seated Cable Row", sets: 3, muscles: [MuscleGroups.UPPER_BACK, MuscleGroups.LATS] },
      { name: "Dumbbell Lateral Raises", sets: 3, muscles: [MuscleGroups.SIDE_SHOULDERS] },
      { name: "Dumbbell Bicep Curls", sets: 3, muscles: [MuscleGroups.BICEPS] },
      { name: "Cable Tricep Pushdowns", sets: 3, muscles: [MuscleGroups.TRICEPS] }
    ],
    "Lower A (Quad Focus)": [
      { name: "Barbell Back Squat", sets: 4, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES, MuscleGroups.CORE] },
      { name: "Romanian Deadlift", sets: 3, muscles: [MuscleGroups.HAMSTRINGS, MuscleGroups.GLUTES, MuscleGroups.LOWER_BACK] },
      { name: "Leg Press", sets: 3, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES] },
      { name: "Leg Extension", sets: 3, muscles: [MuscleGroups.QUADS] },
      { name: "Hamstring Curl", sets: 3, muscles: [MuscleGroups.HAMSTRINGS] },
      { name: "Standing Calf Raises", sets: 4, muscles: [MuscleGroups.CALVES] },
      { name: "Hanging Leg Raises", sets: 3, muscles: [MuscleGroups.ABS, MuscleGroups.CORE] },
      { name: "Plank", sets: 3, muscles: [MuscleGroups.CORE] }
    ],
    "Upper B (Vertical Focus)": [
      { name: "Overhead Barbell Press", sets: 4, muscles: [MuscleGroups.FRONT_SHOULDERS, MuscleGroups.SIDE_SHOULDERS, MuscleGroups.TRICEPS] },
      { name: "Pull-Ups / Lat Pulldown", sets: 4, muscles: [MuscleGroups.LATS, MuscleGroups.UPPER_BACK, MuscleGroups.BICEPS] },
      { name: "Incline Dumbbell Press", sets: 3, muscles: [MuscleGroups.UPPER_CHEST, MuscleGroups.FRONT_SHOULDERS] },
      { name: "Single-Arm Dumbbell Row", sets: 3, muscles: [MuscleGroups.LATS, MuscleGroups.UPPER_BACK] },
      { name: "Dumbbell/Cable Lateral Raises", sets: 3, muscles: [MuscleGroups.SIDE_SHOULDERS] },
      { name: "Face Pulls", sets: 3, muscles: [MuscleGroups.REAR_SHOULDERS, MuscleGroups.UPPER_BACK] },
      { name: "Hammer Curls", sets: 3, muscles: [MuscleGroups.BICEPS, MuscleGroups.FOREARMS] },
      { name: "Overhead Tricep Extension", sets: 3, muscles: [MuscleGroups.TRICEPS] }
    ],
    "Lower B (Glute & Hamstring Focus)": [
      { name: "Hip Thrust", sets: 4, muscles: [MuscleGroups.GLUTES, MuscleGroups.HAMSTRINGS] },
      { name: "Sumo Deadlift / Conventional Deadlift", sets: 3, muscles: [MuscleGroups.HAMSTRINGS, MuscleGroups.GLUTES, MuscleGroups.LOWER_BACK] },
      { name: "Bulgarian Split Squats", sets: 3, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES] },
      { name: "Walking Lunges", sets: 3, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES, MuscleGroups.HAMSTRINGS] },
      { name: "Hamstring Curl (Lying or Seated)", sets: 3, muscles: [MuscleGroups.HAMSTRINGS] },
      { name: "Cable Glute Kickbacks", sets: 3, muscles: [MuscleGroups.GLUTES] },
      { name: "Seated Calf Raises", sets: 4, muscles: [MuscleGroups.CALVES] },
      { name: "Weighted Crunches", sets: 3, muscles: [MuscleGroups.ABS] }
    ]
  },

  // 5-Day Split Routine
  "5-Day Split": {
    "Upper Body Strength": [
      { name: "Bench Press", sets: 4, muscles: [MuscleGroups.MID_CHEST, MuscleGroups.FRONT_SHOULDERS, MuscleGroups.TRICEPS] },
      { name: "Barbell Row", sets: 4, muscles: [MuscleGroups.UPPER_BACK, MuscleGroups.LATS, MuscleGroups.BICEPS] },
      { name: "Overhead Press", sets: 3, muscles: [MuscleGroups.FRONT_SHOULDERS, MuscleGroups.SIDE_SHOULDERS, MuscleGroups.TRICEPS] },
      { name: "Lat Pulldown", sets: 3, muscles: [MuscleGroups.LATS, MuscleGroups.BICEPS] },
      { name: "Dumbbell Lateral Raises", sets: 3, muscles: [MuscleGroups.SIDE_SHOULDERS] },
      { name: "Face Pulls", sets: 3, muscles: [MuscleGroups.REAR_SHOULDERS, MuscleGroups.UPPER_BACK] }
    ],
    "Lower Body Strength": [
      { name: "Barbell Back Squat", sets: 4, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES, MuscleGroups.CORE] },
      { name: "Romanian Deadlift", sets: 3, muscles: [MuscleGroups.HAMSTRINGS, MuscleGroups.GLUTES, MuscleGroups.LOWER_BACK] },
      { name: "Bulgarian Split Squats", sets: 3, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES] },
      { name: "Leg Curl", sets: 3, muscles: [MuscleGroups.HAMSTRINGS] },
      { name: "Standing Calf Raises", sets: 4, muscles: [MuscleGroups.CALVES] },
      { name: "Plank", sets: 3, muscles: [MuscleGroups.CORE, MuscleGroups.ABS] }
    ],
    "Push Day": [
      { name: "Incline Dumbbell Press", sets: 3, muscles: [MuscleGroups.UPPER_CHEST, MuscleGroups.FRONT_SHOULDERS] },
      { name: "Dumbbell Shoulder Press", sets: 3, muscles: [MuscleGroups.FRONT_SHOULDERS, MuscleGroups.SIDE_SHOULDERS] },
      { name: "Cable Chest Fly", sets: 3, muscles: [MuscleGroups.MID_CHEST] },
      { name: "Dumbbell/Cable Lateral Raises", sets: 4, muscles: [MuscleGroups.SIDE_SHOULDERS] },
      { name: "Overhead Tricep Extension", sets: 3, muscles: [MuscleGroups.TRICEPS] },
      { name: "Tricep Pushdowns", sets: 3, muscles: [MuscleGroups.TRICEPS] }
    ],
    "Pull Day": [
      { name: "Pull-Ups / Assisted Pull-Ups", sets: 4, muscles: [MuscleGroups.LATS, MuscleGroups.UPPER_BACK, MuscleGroups.BICEPS] },
      { name: "Seated Cable Row", sets: 3, muscles: [MuscleGroups.UPPER_BACK, MuscleGroups.LATS] },
      { name: "Single-Arm Dumbbell Row", sets: 3, muscles: [MuscleGroups.LATS, MuscleGroups.UPPER_BACK] },
      { name: "Reverse Fly / Rear Delt Fly", sets: 3, muscles: [MuscleGroups.REAR_SHOULDERS, MuscleGroups.UPPER_BACK] },
      { name: "Barbell Curls", sets: 3, muscles: [MuscleGroups.BICEPS] },
      { name: "Hammer Curls", sets: 3, muscles: [MuscleGroups.BICEPS, MuscleGroups.FOREARMS] },
      { name: "Hyperextensions", sets: 3, muscles: [MuscleGroups.LOWER_BACK, MuscleGroups.GLUTES] }
    ],
    "Legs (Glute Focus)": [
      { name: "Hip Thrust", sets: 4, muscles: [MuscleGroups.GLUTES, MuscleGroups.HAMSTRINGS] },
      { name: "Leg Press", sets: 3, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES] },
      { name: "Walking Lunges", sets: 3, muscles: [MuscleGroups.QUADS, MuscleGroups.GLUTES, MuscleGroups.HAMSTRINGS] },
      { name: "Leg Extension", sets: 3, muscles: [MuscleGroups.QUADS] },
      { name: "Hamstring Curl", sets: 3, muscles: [MuscleGroups.HAMSTRINGS] },
      { name: "Cable Kickbacks / Glute Kickbacks", sets: 3, muscles: [MuscleGroups.GLUTES] },
      { name: "Seated Calf Raises", sets: 4, muscles: [MuscleGroups.CALVES] },
      { name: "Weighted Crunches", sets: 3, muscles: [MuscleGroups.ABS] }
    ]
  }
};

// Default routine to use in the app
const defaultRoutine = "PPL";

// Export the routines for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { workoutRoutines, defaultRoutine };
}
