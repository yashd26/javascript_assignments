const table = document.getElementById("entryTable");
const inpFirstName = document.getElementById("firstName");
const inpLastName = document.getElementById("lastName");
const submitButton = document.getElementById("submitButton");
const deleteSelected = document.getElementById("deleteSelected");
const allSelect = document.getElementById("selectAll");
const countSelected = document.getElementById("countSelected");

let editFirstNameCell;
let editLastNameCell;
let deleteButton;

function handleLoad() {
    deleteSelected.disabled = true;
    allSelect.checked = false;
    countSelected.innerHTML = `Total 0 selected row(s)`;
}

function checkDuplicate() {
    const rowEntries = document.querySelectorAll("tr");
    
    for(let i = 0; i < rowEntries.length; ++i) {
        if (rowEntries[i].children[1].children[0].textContent == document.forms[0].elements[0].value.trim() && 
            rowEntries[i].children[2].children[0].textContent == document.forms[0].elements[1].value.trim()) {
            alert("duplicate item");
            return true;       
        }
    }
}

function checkEmpty() {
    if (document.forms[0].elements[0].value.trim() == "" || document.forms[0].elements[1].value.trim() == "") {
        return true;
    }
}

function addState(e) {
    e.preventDefault();
 
    // check for duplicate element
    if(checkDuplicate()) {
        return;
    }
    if (checkEmpty()) {
        return;
    }
    
    //create row
    const entryRow = document.createElement("tr");
    
    // create cells
    const checkCell = document.createElement("td");
    const firstNameCell = document.createElement("td");
    const lastNameCell = document.createElement("td");
    const editCell = document.createElement("td");
    const deleteCell = document.createElement("td");
    
    //create Element
    const checkBox = document.createElement("input");
    const firstName = document.createElement("div");
    const lastName = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    //add inner content
    firstName.innerHTML = document.forms[0].elements[0].value.trim();
    lastName.innerHTML = document.forms[0].elements[1].value.trim();
    editButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";
    checkBox.type = "checkbox";
    checkBox.checked = false;

    //add eventlisteners
    checkBox.addEventListener("change", handleCheck);
    editButton.addEventListener("click", editState);
    deleteButton.addEventListener("click", deleteState);

    // append elements
    checkCell.appendChild(checkBox);
    firstNameCell.appendChild(firstName);
    lastNameCell.appendChild(lastName);
    editCell.appendChild(editButton);
    deleteCell.appendChild(deleteButton);

    entryRow.appendChild(checkCell);
    entryRow.appendChild(firstNameCell);
    entryRow.appendChild(lastNameCell);
    entryRow.appendChild(editCell);
    entryRow.appendChild(deleteCell);

    table.appendChild(entryRow);

    inpFirstName.value = "";
    inpLastName.value = "";

    allSelect.checked = false;
}

function editState(e) {
    deleteButton = e.target.parentNode.parentNode.children[4];
    editFirstNameCell = e.target.parentNode.parentNode.children[1];
    editLastNameCell = e.target.parentNode.parentNode.children[2];

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
    handleCheck();
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

function handleCheck() {
    let checkedCount = 0;
    let checkAllSelect = true;
    let showButton = false;
    const rowEntries = document.querySelectorAll("tr");
    
    for(let i = 0; i < rowEntries.length; ++i) {
        if (rowEntries[i].children[0].children[0].checked) {
            checkedCount++;
            showButton = true;
        }
        if (!rowEntries[i].children[0].children[0].checked) {
            checkAllSelect = false;
        }
    }

    if (showButton) {
        deleteSelected.disabled = false;
    }else {
        deleteSelected.disabled = true;
    }

    if (checkAllSelect && rowEntries.length) {
        allSelect.checked = true;
    }
    else {
        allSelect.checked = false;
    }

    countSelected.innerHTML = `Total ${checkedCount} selected row(s)`;
}

function deleteSelectedState() {
    const rowEntries = document.querySelectorAll("tr");
    
    for(let i = 0; i < rowEntries.length; ++i) {
        if (rowEntries[i].children[0].children[0].checked) {
            rowEntries[i].remove();
        }
    }

    handleCheck();
}

function selectAll() {
    const rowEntries = document.querySelectorAll("tr");

    if (allSelect.checked) {
        for(let i = 0; i < rowEntries.length; ++i) {
            if (!rowEntries[i].children[0].children[0].checked) {
                rowEntries[i].children[0].children[0].checked = true;
            }
        }

        countSelected.innerHTML = `Total ${rowEntries.length} selected row(s)`;
        if (rowEntries.length) {
            deleteSelected.disabled = false;
        }
    }
    else {
        for(let i = 0; i < rowEntries.length; ++i) {
            if (rowEntries[i].children[0].children[0].checked) {
                rowEntries[i].children[0].children[0].checked = false;
                rowEntries[i].children[4].children[0].disabled = false;
            }
        }

        countSelected.innerHTML = `Total 0 selected row(s)`;
        deleteSelected.disabled = true;
    }
}
