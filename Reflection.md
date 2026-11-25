# SBA 4 Task Manager

A simple task manager built with HTML, CSS, and JavaScript. Add tasks, track their status, filter them, and never lose them on a refresh.

# Part 1. How to Use the App

## Getting started

1. Open the project folder.
2. Double click `index.html` to open it in your browser (Chrome, Edge, or Firefox all work).
3. That's it. No installs and no internet needed.

## Adding a task

1. Type a name in the **Task name** box.
2. Pick a category from the dropdown (Work, School, Personal, or Other).
3. Choose a deadline with the date picker.
4. Pick a starting status (In Progress or Completed).
5. Click **Add Task**.

The task appears in the list and a green message confirms it was added. If you leave the name blank, the app reminds you to enter one.

## Changing a task's status

Every task has its own status dropdown. Pick a new status (In Progress, Completed, or Overdue) and the task updates right away. Completed tasks get a green border and their name is crossed out.

## Overdue tasks

You never have to mark a task Overdue yourself. When a deadline has fully passed and the task is not Completed, the app switches it to **Overdue** automatically and highlights it in red.

## Deleting a task

Click the red **Delete** button next to any task to remove it for good.

## Filtering the list

Use the two dropdowns above the list.

* **Status** shows All, In Progress, Completed, or Overdue tasks.
* **Category** shows All, Work, School, Personal, or Other tasks.

Both filters work together. For example, you can show only Overdue School tasks. The counter on the right shows how many tasks are visible out of the total, such as "Showing 2 of 5".

## Saving

Everything saves on its own in your browser's `localStorage`. Close the tab, refresh the page, or come back tomorrow and your tasks are still there.

**Starting fresh.** To wipe every task, press F12, open the **Console** tab, run `localStorage.removeItem("tasks")`, and refresh the page.

## Project files

| File | What it does |
| --- | --- |
| `index.html` | The page structure, including the form, filters, and task list |
| `style.css` | The look, including colors, layout, and the status borders |
| `app.js` | All the behavior, including adding, updating, deleting, filtering, Overdue checks, and saving |

# Part 2. Reflection

## What I built

For this project I built a Task Manager using HTML, CSS, and JavaScript. You can add a task with a name, a category, a deadline, and a status. Each task shows up in a list where you can change its status or delete it. Two dropdowns let you filter the list by status and by category, and a counter shows how many tasks are visible out of the total. If a deadline passes and the task is not completed, the app marks it Overdue on its own. Every change is saved to `localStorage`, so the tasks are still there after a page refresh.

## What went wrong

When I first finished the code, nothing worked. The list never showed up and the buttons did nothing. After debugging, I found that the problems were spread across all three files and not just the JavaScript.

### JavaScript

1. **A one letter typo crashed the whole app.** I declared my array as `let task` but used `tasks` everywhere else. The very first time the app tried to save, it threw a `ReferenceError` and stopped running.
2. **I used a variable I never created.** `renderTasks()` used `taskList`, but I never wrote the line that gets the `<ul>` from the page.
3. **I grabbed the wrong element.** My category filter was pointing at `task-list` instead of the category dropdown, so category filtering could never work.
4. **A single space broke the Overdue feature.** I wrote `` `${deadline} T23:59:59` `` with a space before the T. That creates an Invalid Date, and comparing an Invalid Date always returns false, so no task could ever become Overdue.
5. **Capital letters matter.** My `STATUSES` array said `"in Progress"` but my HTML said `"In Progress"`. JavaScript treats those as two different strings, so the dropdowns and filters did not match.

### HTML

1. **Misspelled IDs.** I spelled category as "catagory" in two IDs, but my JavaScript looked for "category". `getElementById` returned `null`, and the app crashed when it tried to use it.
2. **A misspelled option.** One filter option said "Completd", so filtering by Completed showed nothing.
3. I also fixed the heading, which said "Task Manger", and added a label to the status filter.

### CSS

1. `.task-overdue` should have been `.task.overdue`. The first one looks for a class literally named "task-overdue", but my JavaScript adds two separate classes.
2. `padding: 8px, 10px` is invalid because CSS values are separated by spaces, not commas. The browser quietly ignored the whole line.
3. `margin-bottom: white` is not a size, so it did nothing.
4. `.delete.hover` should have been `.delete:hover`. A dot means a class and a colon means a state.
5. `.filters label` targeted a class that did not exist on my page.
6. `margin-left: 300px` on every button pushed my Delete buttons far off to the right.

## How I fixed it

I opened the browser DevTools and read the Console. The red error messages told me the exact line and the variable that was missing. I fixed one error, refreshed, and checked for the next one. For the HTML and CSS bugs, there was no error message at all, so I had to compare the IDs and class names in each file and make sure they matched exactly.

## What I learned

* **Names have to match exactly across files.** Spelling and capitalization matter in IDs, class names, variable names, and string values. Most of my bugs were just two names that did not match.
* **Read the Console first.** JavaScript errors point straight to the problem. I wasted time guessing before I checked it.
* **CSS fails silently.** A bad CSS line does not show an error. The browser just skips it, so you have to check your styles by looking at the page.
* **One bug can hide others.** The first crash stopped the code before the other bugs could even run, so fixing one revealed the next.
* **Test as I go.** If I had tested after each feature instead of at the end, I would have caught each bug while it was small.

## What I would improve next time

I would add an edit button so a task's name or deadline can be changed, add a way to sort tasks by deadline, and build the app in small steps, testing in the browser after each one.
