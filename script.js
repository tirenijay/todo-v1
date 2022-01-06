// Initialize Variables
var task, taskDesc, priority;
var priorityArray = ["High", "Medium", "Low"];

// Retrieve Data
var taskData = localStorage.getItem("taskData");
// Check if saved taskData is not null/Undefined
if(taskData == undefined || taskData == null) {
    console.log("There is no tasks saved!");
    taskData = [];
} else {
    taskData = JSON.parse(taskData);
    displayTodo(taskData);
}

// Save Data
function saveData(data) {
    // Local Storage
    localStorage.setItem("taskData", JSON.stringify(data));
}

// Add Todo 
function addTodo() {
    // Retrieve the Values
    task = document.getElementById("task").value;
    taskDesc = document.getElementById("taskDesc").value;
    priority = document.getElementById("priority").value;
    
    // Check if task and priority is not empty
    if(task == undefined || task == "") {
        alert("Task field cannot be empty!");
        return;
    }

    // Check if task contains minimum 6 letters
    if(task.length <= 5) {
        alert("Task field must have a minnimum of 6 letters");
        return;
    }

    // Check if Priority is either High, Medium or Low
    if(!priorityArray.includes(priority)) {
        alert("Priority can only be High, Medium or Low!");
        return;
    }
    // Process Data
    let newData = {
        "task": task,
        "desc": taskDesc,
        "priority": priority
    }

    // Save Data in Task Data Array
    taskData.push(newData);
    saveData(taskData);

    // Clear the form 
    document.getElementById("task").value = "";
    document.getElementById("taskDesc").value = "";

    // Notify the User
    alert("ToDo Added!");

    // Display Todo
    displayTodo(taskData);
}


// Display the lists of ToDos
function displayTodo(taskData) {
    let listContainer = document.getElementById("todo-list");
    let colors = {
        "High" : "high",
        "Low" : "low",
        "Medium" : "medium",
        "Completed" : "completed"
    }

    /* let newData = {
        "task": task,
        "desc": taskDesc,
        "priority": priority
    } */

    // Check if array is not empty
    if(taskData.length < 1) {
        listContainer.innerHTML = "<p> There are no To-Dos. Kindly add a To-Do.</p>";
    } else {
        let listHTML = "";
        for(let i = taskData.length - 1; i >= 0;  i--)  {
            if(taskData[i].priority == "Completed") {
                listHTML += `
                    <div class="todo-item todo-completed">
                        <h3>${taskData[i].task}</h3>
                        <p><em>
                        ${taskData[i].desc}
                        </em></p>
                    </div>`;
            } else {
                listHTML += `
                    <div class="todo-item todo-${colors[taskData[i].priority]} todo-flex">
                        <div class="todo-content">
                            <h3>${taskData[i].task}</h3>
                            <p><em>
                            ${taskData[i].desc}
                            </em></p>
                        </div>
                        <div class="todo-marker">
                            <input type="checkbox" class="markToDo" id="todo-${i}" />
                        </div>
                    </div>`;
            }
        }
        listContainer.innerHTML = listHTML;
    }
    document.querySelectorAll('.markToDo').forEach(item => {
        item.addEventListener('click', event => {
            //handle click
            let todoID = (item.id).split("-")[1];
            taskData[todoID].priority = "Completed";
            saveData(taskData);
            displayTodo(taskData);
        })
      })

      
}




