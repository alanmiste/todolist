// getting all required elements.
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

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