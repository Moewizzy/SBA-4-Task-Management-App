// Task Management App
// Tasks live in an array of objects. Every change re-renders the list
// and saves the array to localStorage so it survives a page refresh.

const STORAGE_KEY = "tasks";
const STATUSES = ["in Progress", "Completed", "Overdue"];

//DOM-references
const form = document.getElementById("task-form");
const nameInput = document.getElementById("task-name");
const  categoryInput = document.getElementById("task-category");
const deadlineInput = document.getElementById("task-deadline");
const statusInput = document.getElementById("task-status");
const filterStatus = document.getElementById("filter-status");
const filterCategory = document.getElementById("task-list");
const message = document.getElementById("message");
const count = document.getElementById ("count");

// ----- Storage -----
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

//   load saved tasks, or start empty
let task = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Feedback message that clears itself after 2 seconds
let messageTimer;
function showMessage(text) {
    message.textContent = text;
    clearTimeout(messageTimer);
    messageTimer = setTimeout(() =>
    (message.textContent=""), 2000);
}

// Date Helper
// deadline counts as passed once that whole day (local time)
function isPastDeadline(deadline) {
    return new Date(`${deadline} T23:59:59`) < new Date();
}

function formatDate(deadline) {
    return new Date(`${deadline}T00:00:00`).toLocaleDateString();
}

//Core-Logic

function addTask(name, category, deadline,status) {
    const task = {id:Date.now(),name,category, deadline,status };
    tasks.push(task);
    renderTasks();
    showMessage(`Added "${name}" . `);
}

function updateStatus (id, newStatus) {
const task = tasks.find((t) => t.id === id);
task.status = newStatus;
renderTasks();
showMessage(`"${task.name}" is now ${task.status}.`);
}

function deleteTask(id) {
  const task = tasks.find((t) => t.id === id);
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
  showMessage(`Deleted "${task.name}".`);
}

//Task become overdue
function checkOverdue() {
 tasks.forEach((task) => {
 if (task.status !== "Completed" && isPastDeadline(task.deadline)){
    task.status = "Overdue" ;
 }
});
}

// Returns only the tasks that match both filter dropdowns.
function getFilteredTasks() {
  return tasks.filter((task) => {
    const statusMatch = filterStatus.value === "All" || task.status === filterStatus.value;
    const categoryMatch = filterCategory.value === "All" || task.category === filterCategory.value;
    return statusMatch && categoryMatch;
  });
}

// ----- Rendering -----
// Builds one <li> for a task. textContent is used (not innerHTML)
// so whatever the user types is shown as text, never run as HTML.
function createTaskItem(task) {
  const li = document.createElement("li");
  li.className = `task ${task.status.replace(" ", "-").toLowerCase()}`;

  const info = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = task.name;
  const details = document.createElement("p");
  details.textContent = `${task.category} | Due ${formatDate(task.deadline)}`;
  info.append(title, details);
  // Status dropdown, preselected to the task's current status
  const select = document.createElement("select");
  STATUSES.forEach((s) => select.add(new Option(s, s, false, s === task.status)));
  select.addEventListener("change", () => updateStatus(task.id, select.value));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  li.append(info, select, deleteBtn);
  return li;
}