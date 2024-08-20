
let db;
const request = indexedDB.open("TodoDatabase", 1);

request.onerror = function(event) {
    console.log("Error opening IndexedDB", event);
};

request.onsuccess = function(event) {
    db = request.result;
    console.log("Database opened successfully");
    initializeDefaultTask();
    showItem();
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
    console.log("ObjectStore created or upgraded");
};


let defaultTask = "Mujhe Ghar Jaana hai";
let content = document.querySelector(".text1");
let addTo = document.querySelector(".learn-more");
let addContent = document.querySelector(".text2");


function initializeDefaultTask() {
    let transaction = db.transaction(["todos"], "readonly");
    let objectStore = transaction.objectStore("todos");
    let request = objectStore.getAll();
    
    request.onsuccess = function(event) {
        let tasks = event.target.result;
        if (!tasks.some(task => task.text === defaultTask)) {
            addTaskToDB(defaultTask);
        }
    };
}

addTo.addEventListener("click", addTask);
content.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    let contentItem = content.value;
    content.value = "";

    if (contentItem === "") {
        alert("Please enter a task");
    } else {
        addTaskToDB(contentItem);
    }
}


function addTaskToDB(taskText) {
    let transaction = db.transaction(["todos"], "readwrite");
    let objectStore = transaction.objectStore("todos");
    let request = objectStore.add({ text: taskText });
    
    request.onsuccess = function() {
        console.log("Task added to the database", request.result);
        showItem();
    };
    
    request.onerror = function(event) {
        console.log("Error adding task", event);
    };
}

function showItem() {
    addContent.innerHTML = "";
    let transaction = db.transaction(["todos"]);
    let objectStore = transaction.objectStore("todos");
    let request = objectStore.getAll();

    request.onsuccess = function(event) {
        let TodoList = request.result;
        TodoList.forEach(function(todo, i) {
            let taskDiv = document.createElement("div");
            taskDiv.className = "task";

            let taskText = document.createElement("div");
            taskText.className = "task-text";
            taskText.innerText = todo.text;
            taskDiv.appendChild(taskText);

            let editButton = document.createElement("button");
            editButton.className = "Btn2";
            editButton.innerHTML = '<div>Edit <svg class="svg2" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg></div>';
            editButton.addEventListener("click", function() {
                let newTask = prompt("Edit task:", todo.text);
                if (newTask !== null && newTask !== "") {
                    todo.text = newTask;
                    let updateTransaction = db.transaction(["todos"], "readwrite");
                    let updateStore = updateTransaction.objectStore("todos");
                    updateStore.put(todo).onsuccess = function() {
                        showItem();
                    };
                }
            });
            taskDiv.appendChild(editButton);

            let deleteButton = document.createElement("button");
            deleteButton.className = "Btn";
            deleteButton.innerHTML = '<div class="sign"><svg viewBox="0 0 16 16" class="bi bi-trash3-fill" fill="currentColor" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path></svg></div><div class="text">Delete</div>';
            deleteButton.addEventListener("click", function() {
                let deleteTransaction = db.transaction(["todos"], "readwrite");
                let deleteStore = deleteTransaction.objectStore("todos");
                deleteStore.delete(todo.id).onsuccess = function() {
                    showItem();
                };
            });
            taskDiv.appendChild(deleteButton);

            addContent.appendChild(taskDiv);
        });
    };

    request.onerror = function(event) {
        console.log("Error retrieving tasks", event);
    };
}
