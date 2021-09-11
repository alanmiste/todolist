// getting all required elements.
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

/* localStorage.setItem("name1","text text");
localStorage.getItem("name1"); */


// on key uo event
inputBox.onkeyup = ()=>{
    let enteredValue = inputBox.value; // getting user entered value
    
    if(enteredValue.trim() != 0){ // to check if the user entered some values
    // The trim() method removes whitespace from both ends of a string.
    addBtn.classList.add("active"); // active the add button.
    }else{
        addBtn.classList.remove("active"); // disable the add button.
    }
}

function showTasks(){
    let getLocalStorageData = localStorage.getItem("Todo List");
    if(getLocalStorageData == null){
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorageData); // with JSON.parse() the data becomes a JavaScript object.
    }
    const pendingTasksNum = document.querySelector(".pendingTasks");
    pendingTasksNum.textContent = listArr.length; // to pass array length in pinding task.

    if(listArr.length > 0){
        deleteAllBtn.classList.add("active"); // if the array length is greater than 0 then active the delete button.
    }else{
        deleteAllBtn.classList.remove("active"); // disabel the delete button.
    }

    let newTag = "";
    listArr.forEach((element, index) => { // this to create HTML element for each element in the array.
        newTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class=fas fa-trash"></i></span></li>`;        
    });
    todoList.innerHTML = newTag; // adding new li tag inside ul tag.

    inputBox.value = ""; // Initialize the input box after the task has been added.
}

showTasks();

addBtn.onclick = ()=>{ // when the user click the plus button.
    let enteredValue = inputBox.value; // getting input field value.
    let getLocalStorageData = localStorage.getItem("Todo List"); // get local storage data.

    if(getLocalStorageData == null){
        listArr = []; // if the local storage is empty, create a blank array.
    }else{
        listArr = JSON.parse(getLocalStorageData); //transforming json string into a js object.
    }
    
    listArr.push(enteredValue); // adding a new value to the array.

    localStorage.setItem("Todo List", JSON.stringify(listArr)); // trasform JS object into a JSON sting.

    showTasks(); // call showTasks function to show the tasks.

    addBtn.classList.remove("active"); // disable add button when the task was added
}