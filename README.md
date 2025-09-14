# Workout Tracker App

A simple, mobile-friendly web application for tracking your workouts with a focus on weight and rep progress.

![Workout Tracker](https://placehold.co/600x400?text=Workout+Tracker&font=roboto)

## Overview

This workout tracker is designed to be a minimalist, yet effective tool for logging your strength training progress. It allows you to track weights and reps for predefined workout routines, save your history, and export/import your data.

### Features

- **Mobile-friendly**: Optimized for use on smartphones during workouts
- **Simple logging**: Track only what matters - weights and reps
- **Offline-capable**: Works without an internet connection (after initial load)
- **Data portability**: Export and import your workout data as JSON files
- **Pre-defined routines**: Built-in workout splits for consistent training

## Usage Guide

### Getting Started

1. Open the app in your browser
2. Select a workout day from the dropdown menu
3. Enter weights and reps for each exercise set
4. Click "Save Workout" to record your session

### Viewing History

1. Click "View Logs" to see your previous workout sessions
2. Workouts are displayed in reverse chronological order
3. Click on a workout to expand and see the details of that session

### Data Management

- **Export Data**: Click the dropdown next to "View Logs" and select "Export Data" to download your workout history as a JSON file
- **Import Data**: Select "Import Data" to upload a previously exported workout file
- **Clear Data**: Select "Clear All Data" to reset the application (caution: this cannot be undone)

## Technical Details

### MVP Scope

The application was built as a Minimum Viable Product (MVP) with the following intentional limitations:

- No user authentication or accounts
- No cloud synchronization
- No complex analytics or charts
- No custom exercise creation in the UI

### Technology Stack

- HTML5
- CSS3 with Bootstrap 5
- Vanilla JavaScript
- Local browser storage for data persistence

### Code Organization

The project follows a clean, modular structure:

```
workout/
├── css/
│   └── styles.css           # All styling rules
├── js/
│   ├── app.js               # Core application logic
│   └── routines.js          # Workout routine definitions
└── index.html               # Main HTML structure
```

### Storage

All workout data is stored in the browser's localStorage under the key "workoutLogs". The data structure is:

```javascript
[
  {
    "id": 1694721600000,
    "date": "2025-09-14T10:00:00.000Z",
    "displayDate": "9/14/2025",
    "day": "Push A",
    "routine": "PPL",
    "exercises": [
      {
        "name": "Incline Dumbbell Bench Press",
        "sets": [
          { "setNum": 1, "weight": 30, "reps": 10 },
          { "setNum": 2, "weight": 32.5, "reps": 8 },
          // ...more sets
        ]
      },
      // ...more exercises
    ]
  },
  // ...more workout logs
]
```

## Extending the Application

### Adding New Workout Routines

To add new workout routines:

1. Edit the `js/routines.js` file
2. Add a new routine object following the existing pattern
3. Update the `defaultRoutine` constant if needed

Example of adding a new routine:

```javascript
// In routines.js
const workoutRoutines = {
  // Existing PPL routine...
  
  // Add a new Upper/Lower split
  "Upper/Lower": {
    "Upper A": [
      { name: "Bench Press", sets: 4 },
      { name: "Row", sets: 4 },
      // ...more exercises
    ],
    "Lower A": [
      { name: "Squat", sets: 4 },
      { name: "Romanian Deadlift", sets: 3 },
      // ...more exercises
    ],
    // ...more days
  }
};
```

### Future Enhancement Ideas

Potential features for future development:

- **User accounts**: Add login/signup for multi-device synchronization
- **Progress visualization**: Charts and graphs to track strength gains
- **Custom routines**: Allow users to create and modify workout routines
- **Exercise library**: Add descriptions and instructional content
- **Rest timer**: Integrated timer for tracking rest periods between sets
- **Progressive overload suggestions**: AI-assisted weight progression
- **Personal records**: Track and celebrate new personal bests

## License

MIT License - Feel free to use, modify, and distribute this code.

## Contact

For questions or feedback, please contact [your-email@example.com].
