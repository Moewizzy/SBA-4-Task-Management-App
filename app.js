// Task Management App
// Tasks live in an array of objects. Every change re-renders the list
// and saves the array to localStorage so it survives a page refresh.

const STORAGE_KEY = "tasks";
const STATUSES = ["in Progress", "Completed", "Overdue"];

//DOM-references
const form = document.getElementById("task-form");
const nameInput = document.getElementById("task-name");
const  catagoryInput = document.getElementById("task-catagory");
const deadlineInput = document.getElementById("task-deadline");
const statusInput = document.getElementById("task-status");
const filterStatus = document.getElementById("filter-status");
const filterCatagory = document.getElementById("task-list");
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
    messageTimer = setTimeout(()
 => (message.textContent=""), 2000);
}

