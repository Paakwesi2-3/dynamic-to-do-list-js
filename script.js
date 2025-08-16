// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task on button click
addButton.addEventListener('click', () => {
    if (taskInput.value.trim() !== '') {
        addTask(taskInput.value);
        taskInput.value = '';
    }
});

// Add task when pressing Enter
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && taskInput.value.trim() !== '') {
        addTask(taskInput.value);
        taskInput.value = '';
    }
});

// Function to add a task
function addTask(taskText, save = true) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // When remove is clicked
    removeBtn.onclick = () => {
        li.remove();
        removeTaskFromStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save to Local Storage
    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

// Function to load tasks from Local Storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false = don’t double save
}

// Function to remove a task from Local Storage
function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}
