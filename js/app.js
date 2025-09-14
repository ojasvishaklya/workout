/**
 * Workout Tracker Application
 * 
 * Main application code for tracking workouts, saving data,
 * and managing workout history.
 */

// DOM elements
const daySelect = document.getElementById("daySelect");
const exerciseList = document.getElementById("exerciseList");
const saveBtn = document.getElementById("saveBtn");
const viewLogsBtn = document.getElementById("viewLogsBtn");
const logList = document.getElementById("logList");
const logsSection = document.getElementById("logsSection");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");
const clearBtn = document.getElementById("clearBtn");

// Get the current routine from the loaded routines.js
const currentRoutineId = defaultRoutine;
const routine = workoutRoutines[currentRoutineId];

/**
 * Initialize the application
 */
function initApp() {
  // Populate day selector based on available workout days
  populateDaySelector();
  
  // Set up event listeners
  setupEventListeners();
}

/**
 * Populate the day selector dropdown with workout days from the current routine
 */
function populateDaySelector() {
  // Clear existing options except the first placeholder
  const firstOption = daySelect.options[0];
  daySelect.innerHTML = '';
  daySelect.appendChild(firstOption);
  
  // Add workout days as options
  Object.keys(routine).forEach(day => {
    const option = document.createElement('option');
    option.textContent = day;
    option.value = day;
    daySelect.appendChild(option);
  });
}

/**
 * Set up event listeners for UI interactions
 */
function setupEventListeners() {
  daySelect.addEventListener("change", loadExercises);
  saveBtn.addEventListener("click", saveWorkout);
  viewLogsBtn.addEventListener("click", toggleLogs);
  exportBtn.addEventListener("click", exportData);
  importBtn.addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", importData);
  clearBtn.addEventListener("click", clearData);
}

/**
 * Load exercises based on selected workout day
 */
function loadExercises() {
  const day = daySelect.value;
  exerciseList.innerHTML = "";
  if (!day) return;

  // Hide logs view when selecting a new workout
  logsSection.style.display = "none";

  // Create exercise cards
  routine[day].forEach((ex, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    card.innerHTML = `
      <div class="card-header py-2">
        <strong>${ex.name}</strong>
      </div>
      <div class="card-body p-3">
        <div class="exercise-sets" data-exercise="${index}">
          ${generateSetInputs(ex.sets, index)}
        </div>
      </div>
    `;
    exerciseList.appendChild(card);
  });
}

/**
 * Generate input fields for tracking sets
 * @param {number} numSets - Number of sets for the exercise
 * @param {number} exerciseIndex - Index of the exercise in the routine
 * @returns {string} HTML for set input fields
 */
function generateSetInputs(numSets, exerciseIndex) {
  let inputs = '';
  for (let i = 1; i <= numSets; i++) {
    inputs += `
      <div class="set-input">
        <span>Set ${i}:</span>
        <input type="number" class="form-control weight" placeholder="kg" min="0" step="0.5">
        <input type="number" class="form-control reps" placeholder="reps" min="0">
      </div>
    `;
  }
  return inputs;
}

/**
 * Save workout data to localStorage
 */
function saveWorkout() {
  const day = daySelect.value;
  if (!day) return alert("Please select a workout day!");

  let hasData = false;

  const logEntry = {
    id: Date.now(),
    date: new Date().toISOString(),
    displayDate: new Date().toLocaleDateString(),
    day,
    routine: currentRoutineId,
    exercises: []
  };

  // Collect exercise data
  routine[day].forEach((ex, index) => {
    const exerciseData = {
      name: ex.name,
      sets: []
    };
    
    const setElements = document.querySelectorAll(`[data-exercise="${index}"] .set-input`);
    setElements.forEach((setElement, setIndex) => {
      const weight = setElement.querySelector(".weight").value;
      const reps = setElement.querySelector(".reps").value;
      
      // Save set data even if it's empty (weight and reps will be 0)
      exerciseData.sets.push({
        setNum: setIndex + 1,
        weight: weight ? parseFloat(weight) : 0,
        reps: reps ? parseInt(reps) : 0
      });
      
      // Check if we have any actual data
      if (weight || reps) {
        hasData = true;
      }
    });
    
    logEntry.exercises.push(exerciseData);
  });

  // Warn if no data was entered
  if (!hasData) {
    if (!confirm("No weight or rep data was entered. Save anyway?")) {
      return;
    }
  }

  // Save to localStorage
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  logs.unshift(logEntry); // Add to the beginning for reverse chronological order
  localStorage.setItem("workoutLogs", JSON.stringify(logs));

  // Show success message with more details
  alert(`Workout saved successfully!\n\nDay: ${day}\nDate: ${new Date().toLocaleDateString()}\n\nYou can view your saved workouts by clicking the "View Logs" button.`);
  
  // Reset the form
  exerciseList.innerHTML = "";
  daySelect.value = "";
  
  // Open the logs to show the saved workout
  logsSection.style.display = "block";
  displayLogs();
}

/**
 * Toggle visibility of workout logs section
 */
function toggleLogs() {
  if (logsSection.style.display === "none") {
    displayLogs();
    logsSection.style.display = "block";
    exerciseList.innerHTML = "";
    daySelect.value = "";
  } else {
    logsSection.style.display = "none";
  }
}

/**
 * Display workout logs from localStorage
 */
function displayLogs() {
  logList.innerHTML = "";
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  
  if (logs.length === 0) {
    logList.innerHTML = '<div class="alert alert-info">No workout logs found.</div>';
    return;
  }

  logs.forEach((log) => {
    const formattedDate = new Date(log.date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
    
    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item');
    accordionItem.innerHTML = `
      <h2 class="accordion-header" id="heading-${log.id}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                data-bs-target="#collapse-${log.id}" aria-expanded="false" aria-controls="collapse-${log.id}">
          <div class="d-flex justify-content-between w-100">
            <span>${log.day}</span>
            <span class="workout-date">${formattedDate}</span>
          </div>
        </button>
      </h2>
      <div id="collapse-${log.id}" class="accordion-collapse collapse" 
           aria-labelledby="heading-${log.id}" data-bs-parent="#logList">
        <div class="accordion-body p-3">
          ${generateLogDetails(log)}
        </div>
      </div>
    `;
    
    logList.appendChild(accordionItem);
  });
}

/**
 * Generate HTML for detailed view of a workout log
 * @param {Object} log - Workout log data
 * @returns {string} HTML for workout details
 */
function generateLogDetails(log) {
  let details = '';
  
  log.exercises.forEach(exercise => {
    if (exercise.sets.length > 0) {
      details += `<div class="mb-3">
        <div class="exercise-title">${exercise.name}</div>
        <div class="sets-list">`;
      
      exercise.sets.forEach(set => {
        details += `<div class="small">Set ${set.setNum}: ${set.weight} kg × ${set.reps} reps</div>`;
      });
      
      details += `</div></div>`;
    }
  });
  
  return details || '<div class="text-muted">No exercise data recorded</div>';
}

/**
 * Export workout data as a JSON file
 */
function exportData() {
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  if (logs.length === 0) {
    return alert("No workout data to export!");
  }
  
  const dataStr = JSON.stringify(logs, null, 2);
  const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
  
  const exportFileName = `workout-logs-${new Date().toISOString().slice(0,10)}.json`;
  
  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileName);
  linkElement.click();
}

/**
 * Import workout data from a JSON file
 * @param {Event} event - File input change event
 */
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      
      if (!Array.isArray(importedData)) {
        throw new Error("Invalid data format");
      }
      
      if (confirm("Import will replace all existing data. Continue?")) {
        localStorage.setItem("workoutLogs", JSON.stringify(importedData));
        alert("Data imported successfully!");
        
        // Refresh logs if they're currently being displayed
        if (logsSection.style.display !== "none") {
          displayLogs();
        }
      }
    } catch (error) {
      alert("Error importing data: " + error.message);
    }
    
    // Reset file input
    importFile.value = "";
  };
  reader.readAsText(file);
}

/**
 * Clear all workout data from localStorage
 */
function clearData() {
  if (confirm("Are you sure you want to delete all workout data? This cannot be undone!")) {
    localStorage.removeItem("workoutLogs");
    alert("All workout data has been cleared!");
    
    // Refresh logs if they're currently being displayed
    if (logsSection.style.display !== "none") {
      displayLogs();
    }
  }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);
