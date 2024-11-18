const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3010;

app.use(express.static('static'));

// Initial task list
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addTask(taskList, taskId, text, priority) {
  // Validate the input

  // Create a new task object
  const newTask = {
    taskId: parseInt(taskId, 10),
    text: text,
    priority: parseInt(priority, 10),
  };

  // Add the new task to the list
  taskList.push(newTask);

  return taskList;
}

function showAllTask(taskList) {
  return taskList;
}

function sortTaskByPriority(taskList) {
  return taskList.sort((a, b) => a.priority - b.priority);
}

function editTaskPriority(taskList, taskId, priorityId) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].taskId === taskId) {
      taskList[i].priority = priorityId;
    }
  }
  return taskList;
}

function editTaskText(taskList, taskId, newText) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].taskId === taskId) {
      taskList[i].text = newText;
    }
  }

  return taskList;
}

function deleteTask(taskList, taskId) {
  let initialLength = taskList.length;

  // Filter tasks to exclude the one with the specified taskId
  let updatedList = taskList.filter((task) => task.taskId !== taskId);

  return updatedList;
}

function filterTasksByPriority(taskList, priority) {
  let filteredTasks = taskList.filter((task) => task.priority === priority);

  return filteredTasks;
}

app.get('/tasks/add', (req, res) => {
  let { taskId, text, priority } = req.query;

  tasks = addTask(tasks, taskId, text, priority);

  res.json({ tasks });
});

app.get('/tasks', (req, res) => {
  let currentTasks = showAllTask(tasks);
  res.json({ tasks: currentTasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let currentTasks = sortTaskByPriority(tasks);
  res.json({ tasks: currentTasks });
});

app.get('/tasks/edit-priority', (req, res) => {
  let { taskId, priority } = req.query;

  let taskIdNum = parseInt(taskId, 10);
  let priorityNum = parseInt(priority, 10);

  let updated_tasks = editTaskPriority(tasks, taskIdNum, priorityNum);

  res.json({ updated_tasks });
});

app.get('/tasks/edit-text', (req, res) => {
  let { taskId, text } = req.query;

  let taskIdNum = parseInt(taskId, 10);

  tasks = editTaskText(tasks, taskIdNum, text);

  res.json({ tasks });
});

app.get('/tasks/delete', (req, res) => {
  let { taskId } = req.query;

  // Convert inputs to appropriate types
  let taskIdNum = parseInt(taskId, 10);

  // Call the deleteTask function
  tasks = deleteTask(tasks, taskIdNum);

  // Return the updated task list
  res.json({ tasks });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let { priority } = req.query;

  // Convert priority to an integer
  let priorityNum = parseInt(priority, 10);

  // Call the filterTasksByPriority function
  let filteredTasks = filterTasksByPriority(tasks, priorityNum);

  // Return the filtered tasks
  res.json({ tasks: filteredTasks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
