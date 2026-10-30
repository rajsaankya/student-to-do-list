
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");

    let taskName = taskInput.value.trim();
    let date = taskDate.value;

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        name: taskName,
        date: date,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";
    taskDate.value = "";

    displayTasks();
}

function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = "<p>No tasks available!</p>";
    }

    filteredTasks.forEach(task => {

        let li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        let info = document.createElement("div");
        info.className = "task-info";

        let name = document.createElement("span");
        name.className = "task-name";
        name.textContent = task.name;

        let date = document.createElement("small");
        date.textContent = task.date
            ? "Deadline: " + task.date
            : "No deadline";

        info.appendChild(name);
        info.appendChild(date);

        let completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Done";

        completeButton.onclick = function() {
            toggleTask(task.id);
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.onclick = function() {
            deleteTask(task.id);
        };

        li.appendChild(info);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateStats();
}

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function filterTasks(filter) {

    currentFilter = filter;

    displayTasks();
}

function updateStats() {

    let total = tasks.length;

    let completed = tasks.filter(
        task => task.completed
    ).length;

    let pending = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;
}

displayTasks();
