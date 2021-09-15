/* This code was written by Alan Miste
You can contact me on Twitter @AlanMiste */

// getting all required elements.
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// on key uo event
inputBox.onkeyup = () => {
    let enteredValue = inputBox.value; // getting user entered value
    if (enteredValue.trim().length) { // to check if the user entered some values
        // The trim() method removes whitespace from both ends of a string.
        addBtn.classList.add("active"); // active the add button.
        addBtn.addEventListener("click",addOnClick); // to add Eventlistener to the button to run addOnClick function
        addBtn.disabled = false; // to active the button
    } else {
        addBtn.classList.remove("active"); // disable the add button.
       

    }
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("Todo List");
    if (getLocalStorageData == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorageData); // with JSON.parse() the data becomes a JavaScript object.
    }
    const pendingTasksNum = document.querySelector(".pendingTasks");
    pendingTasksNum.textContent = listArr.length; // to pass array length in pinding task.

    if (listArr.length > 0) {
        deleteAllBtn.classList.add("active"); // if the array length is greater than 0 then active the delete button.
    } else {
        deleteAllBtn.classList.remove("active"); // disabel the delete button.
    }

    let newTag = "";
    listArr.forEach((element, index) => { // this to create HTML element for each element in the array.
        //<i class="fas fa-edit"></i>
        newTag += `<li class="li${index}"><span class="icon1" onclick="editTask(${index})"><i class="fas fa-edit"></i></span>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newTag; // adding new li tag inside ul tag.

    inputBox.value = ""; // Initialize the input box after the task has been added.
}

showTasks();

function addOnClick (){ // when the user click the plus button.
    let enteredValue = inputBox.value; // getting input field value.
    let getLocalStorageData = localStorage.getItem("Todo List"); // get local storage data.
    addBtn.disabled = true;
    addBtn.removeEventListener("click",addOnClick);
    if (getLocalStorageData == null) {
        listArr = []; // if the local storage is empty, create a blank array.
    } else {
        listArr = JSON.parse(getLocalStorageData); //transforming json string into a js object.
    }

    listArr.push(enteredValue); // adding a new value to the array.

    localStorage.setItem("Todo List", JSON.stringify(listArr)); // trasform JS object into a JSON sting.

    showTasks(); // call showTasks function to show the tasks.

    addBtn.classList.remove("active"); // disable add button when the task was added
}


// delete task function
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("Todo List");
    listArr = JSON.parse(getLocalStorageData);
    listArr.splice(index, 1); //delete or remove the li
    localStorage.setItem("Todo List", JSON.stringify(listArr));
    showTasks(); //call the showTasks function
}

// edit button function
function editTask(index) {
    let getLocalStorageData = localStorage.getItem("Todo List");
    listArr = JSON.parse(getLocalStorageData);

    let editLi = document.querySelector(`.li${index}`);

    editLi.innerHTML = `<input class="editInput" type="text" placeholder="Edit your todo" value="${listArr[index]}"><span class="icon2" onclick="editDone(${index})"><i class="fas fa-check"></i>`; // Create a input box in the same location as the task to be modified.

    localStorage.setItem("Todo List", JSON.stringify(listArr)); // set the item in localstorage
    // showTasks(); //call the showTasks function
}
// save eidted task button
function editDone(index) {
    let editLi = document.querySelector(`.editInput`).value;
    listArr[index] = editLi; // Change the value of an array element to the new value
    localStorage.setItem("Todo List", JSON.stringify(listArr)); // set the item in localstorage
    showTasks(); // call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
    let getLocalStorageData = localStorage.getItem("Todo List"); //getting localstorage
    if (getLocalStorageData == null) { //if localstorage has no data
        listArr = []; //create a blank array
    } else {
        listArr = JSON.parse(getLocalStorageData);  //transforming json string into a js object
        listArr = []; //create a blank array
    }
    localStorage.setItem("Todo List", JSON.stringify(listArr)); //set the item in localstorage
    showTasks(); //call the showTasks function
}