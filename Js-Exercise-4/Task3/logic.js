const personArr = [
    { "First Name": "John", "Last Name": "Doe" },
    { "First Name": "Jane", "Last Name": "Smith" },
    { "First Name": "Michael", "Last Name": "Johnson" },
    { "First Name": "Emily", "Last Name": "Brown" },
    { "First Name": "William", "Last Name": "Davis" },
    { "First Name": "Emma", "Last Name": "Martinez" },
    { "First Name": "Daniel", "Last Name": "Anderson" },
    { "First Name": "Olivia", "Last Name": "Taylor" },
    { "First Name": "Alexander", "Last Name": "Thomas" },
    { "First Name": "Sophia", "Last Name": "Jackson" },
    { "First Name": "Matthew", "Last Name": "White" },
    { "First Name": "Ava", "Last Name": "Harris" },
    { "First Name": "David", "Last Name": "Martin" },
    { "First Name": "Isabella", "Last Name": "Thompson" },
    { "First Name": "James", "Last Name": "Garcia" }
];

const table = document.getElementById("entryTable");
const inpFirstName = document.getElementById("firstName");
const inpLastName = document.getElementById("lastName");
const submitButton = document.getElementById("submitButton");

let editFirstNameCell;
let editLastNameCell;
let deleteButton;

function checkEmpty() {
    if (document.forms[0].elements[0].value.trim() == "" || document.forms[0].elements[1].value.trim() == "") {
        return true;
    }
}

function checkRenderDuplicate(obj) {
    const rowEntries = document.querySelectorAll("tr");
    
    for(let i = 0; i < rowEntries.length; ++i) {
        if (rowEntries[i].children[0].children[0].textContent == obj["First Name"] && 
            rowEntries[i].children[1].children[0].textContent == obj["Last Name"]) {
            return true;        
        }
    }
}

function render(obj) {
    //check for duplicates
    if (!checkRenderDuplicate(obj)) {
        //create row
    const entryRow = document.createElement("tr");
    
    // create cells
    const firstNameCell = document.createElement("td");
    const lastNameCell = document.createElement("td");
    const editCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    
    const firstName = document.createElement("div");
    const lastName = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    
    //add eventlisteners
    editButton.addEventListener("click", editState);
    deleteButton.addEventListener("click", deleteState);

    //add inner content
    firstName.innerHTML = obj["First Name"];
    lastName.innerHTML = obj["Last Name"];
    editButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    // append elements
    firstNameCell.appendChild(firstName);
    lastNameCell.appendChild(lastName);
    editCell.appendChild(editButton);
    deleteCell.appendChild(deleteButton);

    entryRow.appendChild(firstNameCell);
    entryRow.appendChild(lastNameCell);
    entryRow.appendChild(editCell);
    entryRow.appendChild(deleteCell);

    table.appendChild(entryRow);
    }
}

function renderStates(e) {
    e.preventDefault();
    
    personArr.forEach(render);
}

function checkDuplicate() {
    const rowEntries = document.querySelectorAll("tr");
    
    for(let i = 0; i < rowEntries.length; ++i) {
        if (rowEntries[i].children[0].children[0].textContent == document.forms[0].elements[0].value.trim() && 
            rowEntries[i].children[1].children[0].textContent == document.forms[0].elements[1].value.trim()) {
            alert("duplicate item");
            return true;        
        }
    }
}

function addState(e) {
    e.preventDefault();
    
    // check for duplicate element
    if(checkDuplicate()) {
        return;
    }
    if(checkEmpty()) {
        return;
    }

    //create row
    const entryRow = document.createElement("tr");
    
    // create cells
    const firstNameCell = document.createElement("td");
    const lastNameCell = document.createElement("td");
    const editCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    
    const firstName = document.createElement("div");
    const lastName = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    
    //add eventlisteners
    editButton.addEventListener("click", editState);
    deleteButton.addEventListener("click", deleteState);

    //add inner content
    firstName.innerHTML = document.forms[0].elements[0].value.trim();
    lastName.innerHTML = document.forms[0].elements[1].value.trim();
    editButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    // append elements
    firstNameCell.appendChild(firstName);
    lastNameCell.appendChild(lastName);
    editCell.appendChild(editButton);
    deleteCell.appendChild(deleteButton);

    entryRow.appendChild(firstNameCell);
    entryRow.appendChild(lastNameCell);
    entryRow.appendChild(editCell);
    entryRow.appendChild(deleteCell);

    table.appendChild(entryRow);

    inpFirstName.value = "";
    inpLastName.value = "";
}

function editState(e) {
    deleteButton = e.target.parentNode.parentNode.children[3];
    editFirstNameCell = e.target.parentNode.parentNode.children[0];
    editLastNameCell = e.target.parentNode.parentNode.children[1];

    inpFirstName.value = editFirstNameCell.textContent;
    inpLastName.value = editLastNameCell.textContent;

    inpFirstName.focus();
    submitButton.value = "Update";

    deleteButton.addEventListener("click", resetUpdate);
    submitButton.addEventListener("click", updateState);
}

function resetUpdate(e) {
    e.preventDefault();

    submitButton.value = "+Add";
    deleteButton.removeEventListener("click", resetUpdate);
    submitButton.removeEventListener("click", updateState);

    inpFirstName.value = "";
    inpLastName.value = "";
}

function deleteState(e) {
    e.target.parentNode.parentNode.remove();
}   

function updateState(e) {
    e.preventDefault();

    submitButton.value = "+Add";
    submitButton.removeEventListener("click", updateState);
    deleteButton.removeEventListener("click", resetUpdate);

    if (checkDuplicate()) {
        return;
    }
    if (checkEmpty()) {
        return;
    }

    editFirstNameCell.textContent = inpFirstName.value.trim();
    editLastNameCell.textContent = inpLastName.value.trim();

    inpFirstName.value = "";
    inpLastName.value = "";
}
