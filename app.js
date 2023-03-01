// get elements
const alert = document.querySelector(".alert");
const form = document.querySelector(".form");
const input = document.querySelector("#input");
const submitBtn = document.querySelector(".btn");
const list = document.querySelector(".list");

const clearItem = document.querySelector(".clear-items")
const clearBtn = document.querySelector(".clear-items-btn");



// addEventListener
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearAll)
window.addEventListener("DOMContentLoaded", setupItem)

// edit option
let editElement;
let editFlag = false;
let editID = "";

// Function
function addItem(e) {
  e.preventDefault();
  let value = input.value;
  let id = new Date().getTime().toString();

  if (value && !editFlag) {
    createItem(id,value)
    // alert success
    displayAlert("item added to the list", "success")
    // list visible
    list.classList.add("show-list")
    clearItem.classList.add("clear-items-visible")

    // localStorage add
    addLocalStorage(id,value)
    // back to default
    backDefault()

  } 
  
  else if (value && editFlag) {
    editElement.innerHTML = value
    displayAlert("item changed", "success")
    editLocalStorage(editID,value)
    backDefault()

  } 
  else {
    displayAlert("Please enter something", "danger")

  }
}
// edit item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement
    
    editElement = e.currentTarget.parentElement.previousElementSibling;
    input.value = editElement.innerHTML
    editFlag = true; 
    editID = element.dataset.id;
    submitBtn.textContent = "edit"
    input.focus()

    
}


// delete item
function deleteItem(e) {
    let element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)
    if(list.children.length === 0) {
        clearItem.classList.remove("clear-items-visible")
        
    }
    displayAlert("item removed from the list", "danger")
    removeFromLocalStorage(id)
    backDefault()
}
// clear ALL
function clearAll() {
    
    list.innerHTML = ""
    clearItem.classList.remove("clear-items-visible")
    displayAlert("List empty", "danger")
    localStorage.removeItem("liste")
    backDefault()
}

// backtoDefault
function backDefault() {
    input.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}
//  display alert
function displayAlert(message, aClass) {
  alert.textContent = message;
  alert.classList.add(`alert-${aClass}`);

  setTimeout(function displayAlert() {
    alert.textContent = "";
    alert.classList.remove(`alert-${aClass}`);
  }, 2500);
}

// local storage
// add
function addLocalStorage(id,value) {
    const groceries = {id:id, value:value}
    let items = localStorage.getItem("liste") ? JSON.parse(localStorage.getItem("liste")) : [];
    console.log(items)
    items.push(groceries)
    localStorage.setItem("liste", JSON.stringify(items))
}
// remove
function removeFromLocalStorage(id) {
    let items = localStorage.getItem("liste") ? JSON.parse(localStorage.getItem("liste")) : [];
    items = items.filter(function (item) {
        if(item.id !== id) {
            return item;
        }
    })
    
    localStorage.setItem("liste", JSON.stringify(items))
    

    
}
// edit
function editLocalStorage(id,value) {
    let items = localStorage.getItem("liste") ? JSON.parse(localStorage.getItem("liste")) : [];
    items = items.map(function(item) {
        if(item.id == id) {
        item.value = value
        }
        return item
    })
    localStorage.setItem("liste", JSON.stringify(items))

}
// items show when the page open..

function setupItem(id,value) {
  let items = localStorage.getItem("liste") ? JSON.parse(localStorage.getItem("liste")) : [];
  if(items.length > 0) {
items.forEach(function(item) {
  createItem(item.id,item.value)
})
list.classList.add("show-list")
clearItem.classList.add("clear-items-visible")
  }
  
}
// create Item
function createItem(id,value) {
  let setinput = document.createElement("div");
    setinput.classList.add("article");
    // let attId = document.createAttribute("data-id");
    // attId.value = id;
    // setinput.setAttributeNode(attId);
    setinput.setAttribute("data-id", id)
    setinput.innerHTML = `<p class="grocery-item">${value}</p>
    <div class="btn-container">
        <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
        <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>`;
    const deleteBtn = setinput.querySelector(".delete-btn")
    const editBtn = setinput.querySelector(".edit-btn")
    deleteBtn.addEventListener("click",deleteItem)
    editBtn.addEventListener("click",editItem)
    list.append(setinput)

}