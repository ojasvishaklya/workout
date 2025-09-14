/**
 * Workout Tracker Application
 * 
 * Main application code for tracking workouts, saving data,
 * and managing workout history.
 */

// DOM elements with null checks
const daySelect = document.getElementById("daySelect");
const exerciseList = document.getElementById("exerciseList");
const saveBtn = document.getElementById("saveBtn");
const logList = document.getElementById("logList");
const logsSection = document.getElementById("logsSection");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");
const clearBtn = document.getElementById("clearBtn");

// Navigation elements
const workoutTab = document.getElementById("workoutTab");
const historyTab = document.getElementById("historyTab");
const moreTab = document.getElementById("moreTab");
const moreMenu = document.getElementById("moreMenu");
const mainContent = document.querySelector(".main-content");

// Timer elements
const stickyActionBar = document.getElementById("stickyActionBar");
const workoutTimer = document.getElementById("workoutTimer");
const timerToggle = document.getElementById("timerToggle");

// Check for missing critical DOM elements
function checkRequiredElements() {
  const requiredElements = [
    { element: daySelect, name: 'daySelect' },
    { element: exerciseList, name: 'exerciseList' },
    { element: saveBtn, name: 'saveBtn' },
    { element: workoutTab, name: 'workoutTab' },
    { element: historyTab, name: 'historyTab' },
    { element: stickyActionBar, name: 'stickyActionBar' },
    { element: workoutTimer, name: 'workoutTimer' },
    { element: timerToggle, name: 'timerToggle' }
  ];
  
  const missing = requiredElements.filter(({ element }) => !element);
  
  if (missing.length > 0) {
    const missingNames = missing.map(({ name }) => name).join(', ');
    console.error('Missing required DOM elements:', missingNames);
    alert(`Critical Error: Missing HTML elements (${missingNames}). Please check the HTML file.`);
    return false;
  }
  
  return true;
}

// Timer state
let timerStartTime = null;
let timerInterval = null;
let isTimerRunning = false;
let totalElapsedTime = 0;

// Get the current routine from the loaded routines.js with error handling
let currentRoutineId;
let routine;

try {
  if (typeof workoutRoutines === 'undefined' || typeof defaultRoutine === 'undefined') {
    throw new Error('Workout routines not loaded');
  }
  currentRoutineId = defaultRoutine;
  routine = workoutRoutines[currentRoutineId];
  
  if (!routine) {
    throw new Error(`Routine '${currentRoutineId}' not found`);
  }
} catch (error) {
  console.error('Error loading workout routines:', error);
  alert('Error: Workout routines failed to load. Please refresh the page.');
  // Fallback routine
  currentRoutineId = 'PPL';
  routine = {
    "Push A": [{ name: "Basic Push Exercise", sets: 3 }],
    "Pull A": [{ name: "Basic Pull Exercise", sets: 3 }],
    "Legs A": [{ name: "Basic Leg Exercise", sets: 3 }]
  };
}

/**
 * Initialize the application
 */
function initApp() {
  // Check for required DOM elements first
  if (!checkRequiredElements()) {
    return; // Stop initialization if critical elements are missing
  }
  
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
  exportBtn.addEventListener("click", exportData);
  importBtn.addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", importData);
  clearBtn.addEventListener("click", clearData);
  
  // Navigation listeners
  workoutTab.addEventListener("click", showWorkoutView);
  historyTab.addEventListener("click", showHistoryView);
  moreTab.addEventListener("click", toggleMoreMenu);
  
  // Timer listeners
  timerToggle.addEventListener("click", toggleTimer);
  
  // Close more menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!moreTab.contains(e.target) && !moreMenu.contains(e.target)) {
      moreMenu.style.display = "none";
    }
  });
}

/**
 * Load exercises based on selected workout day
 */
function loadExercises() {
  const day = daySelect.value;
  exerciseList.innerHTML = "";
  
  if (!day) {
    // Hide sticky action bar when no day is selected
    stickyActionBar.style.display = "none";
    resetTimer();
    return;
  }

  // Show workout view when exercises are loaded
  showWorkoutView();
  
  // Show sticky action bar
  stickyActionBar.style.display = "flex";
  
  // Reset timer for new workout
  resetTimer();

  // Get last workout data for prepopulation
  const lastWorkoutData = getLastWorkoutData(day);
  
  // Show help text if we have previous data
  const helpText = document.getElementById('helpText');
  if (lastWorkoutData && helpText) {
    helpText.style.display = 'block';
  } else if (helpText) {
    helpText.style.display = 'none';
  }

  // Create exercise cards with new styling
  routine[day].forEach((ex, index) => {
    const card = document.createElement("div");
    card.classList.add("exercise-card");
    
    // Get exercise data by name instead of index for safety
    const exerciseData = getExerciseDataByName(lastWorkoutData, ex.name);
    
    // Check if we have previous data for this exercise
    const hasLastData = exerciseData && exerciseData.sets && exerciseData.sets.some(set => set.weight > 0 || set.reps > 0);
    const lastDataIndicator = hasLastData ? '<small class="text-primary"><i class="bi bi-clock-history"></i> Previous data loaded</small>' : '';
    
    card.innerHTML = `
      <div class="exercise-header">
        ${ex.name}
        ${lastDataIndicator}
      </div>
      <div class="exercise-body">
        <div class="exercise-sets" data-exercise="${index}">
          ${generateSetInputs(ex.sets, index, exerciseData)}
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
 * @param {Object} lastExerciseData - Previous workout data for this exercise
 * @returns {string} HTML for set input fields
 */
function generateSetInputs(numSets, exerciseIndex, lastExerciseData) {
  let inputs = '';
  for (let i = 1; i <= numSets; i++) {
    // Get previous set data if available
    const lastSet = lastExerciseData && lastExerciseData.sets && lastExerciseData.sets[i - 1];
    const lastWeight = lastSet ? lastSet.weight : '';
    const lastReps = lastSet ? lastSet.reps : '';
    
    // Create placeholder text showing previous values
    const weightPlaceholder = lastWeight ? `${lastWeight} kg (last)` : 'kg';
    const repsPlaceholder = lastReps ? `${lastReps} reps (last)` : 'reps';
    
    inputs += `
      <div class="set-input">
        <span>Set ${i}:</span>
        <input type="number" class="form-control weight" placeholder="${weightPlaceholder}" min="0" step="0.5" data-last="${lastWeight || ''}" ondblclick="fillLastValue(this)">
        <input type="number" class="form-control reps" placeholder="${repsPlaceholder}" min="0" data-last="${lastReps || ''}" ondblclick="fillLastValue(this)">
      </div>
    `;
  }
  return inputs;
}

/**
 * Get the last workout data for a specific day to prepopulate the form
 * @param {string} workoutDay - The workout day to find last data for
 * @returns {Object|null} Last workout data or null if not found
 */
function getLastWorkoutData(workoutDay) {
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  
  // Find the most recent workout for this specific day
  const lastWorkout = logs.find(log => log.day === workoutDay);
  
  return lastWorkout || null;
}

/**
 * Get exercise data from last workout by exercise name (safer than index)
 * @param {Object} lastWorkoutData - Last workout data
 * @param {string} exerciseName - Name of the exercise to find
 * @returns {Object|null} Exercise data or null if not found
 */
function getExerciseDataByName(lastWorkoutData, exerciseName) {
  if (!lastWorkoutData || !lastWorkoutData.exercises) {
    return null;
  }
  
  return lastWorkoutData.exercises.find(ex => ex.name === exerciseName) || null;
}

/**
 * Fill input with last workout value on double-click
 * @param {HTMLElement} input - The input element that was double-clicked
 */
function fillLastValue(input) {
  const lastValue = input.getAttribute('data-last');
  if (lastValue && lastValue !== '') {
    input.value = lastValue;
    input.focus();
  }
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
    duration: getWorkoutDuration(), // Add workout duration
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
  const duration = getWorkoutDuration();
  alert(`Workout saved successfully!\n\nDay: ${day}\nDate: ${new Date().toLocaleDateString()}\nDuration: ${duration} minutes\n\nView your saved workouts in the History tab.`);
  
  // Reset the form and timer
  exerciseList.innerHTML = "";
  daySelect.value = "";
  stickyActionBar.style.display = "none";
  resetTimer();
  
  // Switch to history view to show the saved workout
  showHistoryView();
}

/**
 * Toggle visibility of workout logs section
 */
function toggleLogs() {
  if (logsSection.style.display === "none") {
    showHistoryView();
  } else {
    showWorkoutView();
  }
}

/**
 * Show workout view (main tab)
 */
function showWorkoutView() {
  // Update navigation
  setActiveTab(workoutTab);
  
  // Show/hide sections
  logsSection.style.display = "none";
  
  // Show day selector
  daySelect.parentElement.style.display = "block";
  
  // Show sticky action bar if day is selected
  if (daySelect.value) {
    stickyActionBar.style.display = "flex";
  }
  
  // Close more menu
  moreMenu.style.display = "none";
}

/**
 * Show history view
 */
function showHistoryView() {
  // Update navigation
  setActiveTab(historyTab);
  
  // Show/hide sections
  logsSection.style.display = "block";
  stickyActionBar.style.display = "none";
  
  // Hide day selector
  daySelect.parentElement.style.display = "none";
  
  // Load logs
  displayLogs();
  
  // Close more menu
  moreMenu.style.display = "none";
}

/**
 * Toggle more menu
 */
function toggleMoreMenu() {
  const isVisible = moreMenu.style.display === "block";
  moreMenu.style.display = isVisible ? "none" : "block";
}

/**
 * Set active navigation tab
 */
function setActiveTab(activeTab) {
  // Remove active class from all tabs
  [workoutTab, historyTab, moreTab].forEach(tab => {
    tab.classList.remove("active");
  });
  
  // Add active class to selected tab
  activeTab.classList.add("active");
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
  
  // Add action buttons at the top
  details += `
    <div class="action-buttons">
      <button class="btn btn-outline-primary btn-sm" onclick="editWorkout('${log.id}')">
        <i class="bi bi-pencil"></i> Edit
      </button>
      <button class="btn btn-outline-danger btn-sm" onclick="deleteWorkout('${log.id}')">
        <i class="bi bi-trash"></i> Delete
      </button>
    </div>
  `;
  
  // Add workout duration if available
  if (log.duration !== undefined) {
    details += `<div class="mb-3"><small class="text-muted"><i class="bi bi-stopwatch"></i> Duration: ${log.duration} minutes</small></div>`;
  }
  
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

/**
 * Delete a specific workout from history
 * @param {string} workoutId - ID of the workout to delete
 */
function deleteWorkout(workoutId) {
  if (!confirm("Are you sure you want to delete this workout? This cannot be undone!")) {
    return;
  }
  
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  const updatedLogs = logs.filter(log => log.id.toString() !== workoutId.toString());
  
  localStorage.setItem("workoutLogs", JSON.stringify(updatedLogs));
  
  // Refresh the logs display
  displayLogs();
  
  alert("Workout deleted successfully!");
}

/**
 * Edit a specific workout from history
 * @param {string} workoutId - ID of the workout to edit
 */
function editWorkout(workoutId) {
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  const workout = logs.find(log => log.id.toString() === workoutId.toString());
  
  if (!workout) {
    alert("Workout not found!");
    return;
  }
  
  // Switch to workout view
  showWorkoutView();
  
  // Set the day selector to the workout's day
  daySelect.value = workout.day;
  
  // Load the exercises for that day
  loadExercises();
  
  // Populate the form with existing workout data
  populateEditForm(workout);
  
  // Change save button to update mode
  saveBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Update';
  saveBtn.onclick = () => updateWorkout(workoutId);
  
  // Add cancel button functionality
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-secondary';
  cancelBtn.innerHTML = '<i class="bi bi-x-circle"></i> Cancel';
  cancelBtn.onclick = () => {
    if (confirm('Cancel editing? Any unsaved changes will be lost.')) {
      resetEditMode();
      // Show history view
      showHistoryView();
    }
  };
  stickyActionBar.appendChild(cancelBtn);
  
  // Scroll to top
  window.scrollTo(0, 0);
}

/**
 * Populate the exercise form with existing workout data for editing
 * @param {Object} workout - The workout data to edit
 */
function populateEditForm(workout) {
  if (!workout || !workout.exercises) {
    return;
  }
  
  workout.exercises.forEach((exercise, exerciseIndex) => {
    const exerciseElement = document.querySelector(`[data-exercise="${exerciseIndex}"]`);
    if (!exerciseElement || !exercise.sets) return;
    
    const setInputs = exerciseElement.querySelectorAll('.set-input');
    exercise.sets.forEach((set, setIndex) => {
      if (setInputs[setIndex]) {
        const weightInput = setInputs[setIndex].querySelector('.weight');
        const repsInput = setInputs[setIndex].querySelector('.reps');
        
        if (weightInput) weightInput.value = set.weight || '';
        if (repsInput) repsInput.value = set.reps || '';
      }
    });
  });
}

/**
 * Update an existing workout with new data
 * @param {string} workoutId - ID of the workout to update
 */
function updateWorkout(workoutId) {
  const day = daySelect.value;
  if (!day) return alert("Please select a workout day!");

  let hasData = false;
  const logs = JSON.parse(localStorage.getItem("workoutLogs") || "[]");
  const workoutIndex = logs.findIndex(log => log.id.toString() === workoutId.toString());
  
  if (workoutIndex === -1) {
    alert("Workout not found!");
    return;
  }

  // Update the existing workout entry
  const updatedWorkout = logs[workoutIndex];
  updatedWorkout.exercises = [];

  // Collect updated exercise data
  routine[day].forEach((ex, index) => {
    const exerciseData = {
      name: ex.name,
      sets: []
    };
    
    const setElements = document.querySelectorAll(`[data-exercise="${index}"] .set-input`);
    setElements.forEach((setElement, setIndex) => {
      const weight = setElement.querySelector(".weight").value;
      const reps = setElement.querySelector(".reps").value;
      
      exerciseData.sets.push({
        setNum: setIndex + 1,
        weight: weight ? parseFloat(weight) : 0,
        reps: reps ? parseInt(reps) : 0
      });
      
      if (weight || reps) {
        hasData = true;
      }
    });
    
    updatedWorkout.exercises.push(exerciseData);
  });

  // Warn if no data was entered
  if (!hasData) {
    if (!confirm("No weight or rep data was entered. Update anyway?")) {
      return;
    }
  }

  // Save updated logs
  localStorage.setItem("workoutLogs", JSON.stringify(logs));

  // Show success message
  alert(`Workout updated successfully!\n\nDay: ${day}\nDate: ${new Date(updatedWorkout.date).toLocaleDateString()}`);
  
  // Reset the form and button
  resetEditMode();
  
  // Show the updated logs
  showHistoryView();
}

/**
 * Reset the form from edit mode back to normal mode
 */
function resetEditMode() {
  exerciseList.innerHTML = "";
  daySelect.value = "";
  saveBtn.innerHTML = '<i class="bi bi-save"></i> Save';
  saveBtn.onclick = saveWorkout;
  
  // Remove cancel button if it exists
  const cancelBtn = stickyActionBar.querySelector('button:last-child');
  if (cancelBtn && cancelBtn.innerHTML.includes('Cancel')) {
    cancelBtn.remove();
  }
  
  // Hide sticky action bar
  stickyActionBar.style.display = "none";
  
  // Reset timer
  resetTimer();
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);

// Cleanup timer when page unloads to prevent memory leaks
window.addEventListener('beforeunload', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

/**
 * Timer Functions
 */

/**
 * Toggle workout timer on/off
 */
function toggleTimer() {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

/**
 * Start the workout timer
 */
function startTimer() {
  if (!isTimerRunning && timerToggle && workoutTimer) {
    // Clear any existing interval first
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    timerStartTime = Date.now() - totalElapsedTime;
    isTimerRunning = true;
    
    // Update button appearance
    timerToggle.innerHTML = '<i class="bi bi-pause-fill"></i>';
    timerToggle.classList.add('active');
    
    // Start the interval
    timerInterval = setInterval(updateTimerDisplay, 1000);
  }
}

/**
 * Pause the workout timer
 */
function pauseTimer() {
  if (isTimerRunning && timerToggle) {
    isTimerRunning = false;
    totalElapsedTime = Date.now() - timerStartTime;
    
    // Update button appearance
    timerToggle.innerHTML = '<i class="bi bi-play-fill"></i>';
    timerToggle.classList.remove('active');
    
    // Clear the interval
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
}

/**
 * Reset the workout timer
 */
function resetTimer() {
  // Clear any existing interval first to prevent memory leaks
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  isTimerRunning = false;
  totalElapsedTime = 0;
  timerStartTime = null;
  
  // Update button appearance safely
  if (timerToggle) {
    timerToggle.innerHTML = '<i class="bi bi-play-fill"></i>';
    timerToggle.classList.remove('active');
  }
  
  // Reset display safely
  if (workoutTimer) {
    workoutTimer.textContent = "00:00";
  }
}

/**
 * Update the timer display
 */
function updateTimerDisplay() {
  if (isTimerRunning && workoutTimer) {
    const elapsed = Date.now() - timerStartTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    workoutTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

/**
 * Get current workout duration in minutes
 */
function getWorkoutDuration() {
  if (isTimerRunning) {
    return Math.round((Date.now() - timerStartTime) / 60000);
  } else {
    return Math.round(totalElapsedTime / 60000);
  }
}
