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

const workoutRoutines = {
  // PPL (Push, Pull, Legs) Routine
  "PPL": {
    "Push A": [
      { name: "Incline Dumbbell Bench Press", sets: 4 },
      { name: "Seated Chest Press", sets: 3 },
      { name: "Overhead Shoulder Press", sets: 3 },
      { name: "Chest Fly", sets: 3 },
      { name: "Lateral Raises", sets: 3 },
      { name: "Overhead Tricep Extension", sets: 3 },
      { name: "Tricep Pushdowns", sets: 3 }
    ],
    "Pull A": [
      { name: "Lat Pulldown / Chin-Ups", sets: 4 },
      { name: "Seated Cable Row / Barbell Row", sets: 3 },
      { name: "Hyperextensions", sets: 3 },
      { name: "Shrugs", sets: 3 },
      { name: "Incline DB / Bayesian Curls", sets: 4 },
      { name: "Preacher / Spider Curls", sets: 3 },
      { name: "Wrist Curls + Dead Hangs", sets: 3 }
    ],
    "Legs A": [
      { name: "Barbell Squat", sets: 4 },
      { name: "Hip Thrusts", sets: 3 },
      { name: "Leg Extensions", sets: 3 },
      { name: "Standing Calf Raises", sets: 4 },
      { name: "Weighted Crunches", sets: 3 }
    ],
    "Push B": [
      { name: "Dumbbell Shoulder Press", sets: 3 },
      { name: "Flat Bench Press", sets: 3 },
      { name: "Lateral Raises", sets: 3 },
      { name: "Incline Dumbbell Fly", sets: 3 },
      { name: "Front Raise", sets: 3 },
      { name: "Skull Crushers", sets: 3 },
      { name: "Weighted Dips / Kickbacks", sets: 3 }
    ],
    "Pull B": [
      { name: "Barbell Row (overhand)", sets: 4 },
      { name: "Pull-Ups (neutral/close)", sets: 3 },
      { name: "Rear Delt Fly / Face Pulls", sets: 3 },
      { name: "Single-Arm DB Row", sets: 3 },
      { name: "Standing Cable Curl", sets: 4 },
      { name: "Hammer / Reverse Curls", sets: 3 },
      { name: "Wrist Curls + Dead Hangs", sets: 3 }
    ],
    "Legs B": [
      { name: "Leg Press", sets: 4 },
      { name: "Romanian Deadlift", sets: 4 },
      { name: "Dumbbell Lunges", sets: 3 },
      { name: "Hamstring Curls", sets: 3 },
      { name: "Seated Calf Raises", sets: 4 },
      { name: "Weighted Crunches", sets: 3 }
    ]
  },

  // You can add more routines here in the future
  // Example:
  // "Upper/Lower": {
  //   "Upper A": [ ... ],
  //   "Lower A": [ ... ],
  //   ...
  // }
};

// Default routine to use in the app
const defaultRoutine = "PPL";

// Export the routines for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { workoutRoutines, defaultRoutine };
}
