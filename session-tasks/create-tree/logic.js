// const { connection } = require("./dbConfig");
const treeContainer = document.getElementById('tree');

const nodeRadius = 20;
const levelHeight = 100;
const nodeWidth = 80;

let idCount;
let treeObj = "";

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("count")) {
        idCount = +localStorage.getItem("count"); 
    }
    else {
        idCount = 2;
        localStorage.setItem("count", idCount);
    }

    if (!localStorage.getItem("node")) {
        const rootNode = {
            "1": {
                value: "root"
            }
        }
        localStorage.setItem("node", JSON.stringify(rootNode));
        createTree(JSON.parse(localStorage.getItem("node")), treeContainer);
    }
    else {
        createTree(JSON.parse(localStorage.getItem("node")), treeContainer);
    }

    document.addEventListener("click", function (event) {
        const popover = document.getElementsByClassName("popover");
        const node = document.getElementsByClassName("node");

        for (let i = 0; i < node.length; ++i) {
            if (!popover[i].contains(event.target) && !node[i].contains(event.target)) {
                popover[i].style.display = "none";
            }
        }
    });
});

function addObjectByKey(obj, keyToFind, newKey, newValue) {
    if (obj.hasOwnProperty(keyToFind)) {
        obj[keyToFind][newKey] = { "value": newValue };
        return true;
    }

    for (const prop in obj) {
        if (typeof obj[prop] === 'object') {
            const found = addObjectByKey(obj[prop], keyToFind, newKey, newValue);
            if (found) {
                return true;
            }
        }
    }

    return false;
}

function addNode(event) {
    const nodeVal = prompt("Please enter the node value: ", "");

    if (nodeVal == "" || nodeVal == null) {
        alert("please enter valid input");
        return;
    }

    const tooltip = event.target.closest(".node");
    const nodeId = +tooltip.id.substring(4);

    const obj = JSON.parse(localStorage.getItem("node"));
    addObjectByKey(obj, nodeId, idCount, nodeVal);
    idCount++;
    localStorage.setItem("count", idCount);
    localStorage.setItem("node", JSON.stringify(obj));
    treeContainer.innerHTML = "";
    createTree(JSON.parse(localStorage.getItem("node")), treeContainer);
}

function removeObjectByKey(obj, keyToRemove) {
    if (obj.hasOwnProperty(keyToRemove)) {
        delete obj[keyToRemove];
        return true;
    }

    for (const prop in obj) {
        if (typeof obj[prop] === 'object') {
            const found = removeObjectByKey(obj[prop], keyToRemove);
            if (found) {
                return true;
            }
        }
    }

    return false;
}

function removeNode(event) {
    const tooltip = event.target.closest(".node");
    const nodeId = +tooltip.id.substring(4);

    const obj = JSON.parse(localStorage.getItem("node"));
    removeObjectByKey(obj, nodeId);
    localStorage.setItem("node", JSON.stringify(obj));
    treeContainer.innerHTML = "";
    createTree(JSON.parse(localStorage.getItem("node")), treeContainer);
}

function addMultipleObjectsByKey(obj, keyToFind, newKey, newValue) {
    console.log("multiple called");
    if (obj.hasOwnProperty(keyToFind)) {
        console.log(newValue);
        obj[keyToFind][newKey] = newValue;
        console.log(obj);
        return true;
    }

    for (const prop in obj) {
        console.log("for loop");
        if (typeof obj[prop] === 'object') {
            console.log("object inside");
            const found = addMultipleObjectsByKey(obj[prop], keyToFind, newKey, newValue);
            if (found) {
                return true;
            }
        }
    }

    return false;
}

function moveObjectByKey(source, destinationKey, keyToMove) {
    if (source.hasOwnProperty(keyToMove)) {
        const valueToMove = source[keyToMove];
        // console.log(valueToMove);
        // console.log(keyToMove);
        removeObjectByKey(treeObj, keyToMove);

        // console.log(valueToMove);
        if (addMultipleObjectsByKey(treeObj, destinationKey, keyToMove, valueToMove)) {
            return true;
        }
    }

    for (const prop in source) {
        if (typeof source[prop] === 'object') {
            const moved = moveObjectByKey(source[prop], destinationKey, keyToMove);
            if (moved) {
                return true;
            }
        }
    }

    return false;
}

function moveNode(event) {
    treeObj = JSON.parse(localStorage.getItem("node"));

    const tooltip = event.target.closest(".node");
    const nodeId = +tooltip.id.substring(4);

    const destinationKey = prompt("Please enter the destinaion key value: ", "");

    if (destinationKey == "" || destinationKey == null) {
        alert("please enter valid input");
        return;
    }

    const obj = JSON.parse(localStorage.getItem("node"));
    if (moveObjectByKey(obj, destinationKey, nodeId)) {
        localStorage.setItem("node", JSON.stringify(treeObj));
        treeContainer.innerHTML = "";
        createTree(JSON.parse(localStorage.getItem("node")), treeContainer);
        return;
    }

    alert("cannot move to the node's child");
}

function mergeObjectByKey(source, destinationKey, keyToMove) {
    if (source.hasOwnProperty(keyToMove)) {
        const valueToMove = source[keyToMove];
        removeObjectByKey(treeObj, keyToMove);

        // console.log(valueToMove);
        console.log(valueToMove);
        let flag = true;
        for (key in valueToMove) {
            console.log(key, typeof valueToMove[key]);
            if (typeof valueToMove[key] === 'object') {
                console.log("inside if");
                const found = addMultipleObjectsByKey(treeObj, destinationKey, key, valueToMove[key]);
                if (!found) {
                    flag = false;
                }
            }
        }
        // console.log(flag);
        if (flag) {
            return true;
        }

        return false;
    }

    for (const prop in source) {
        if (typeof source[prop] === 'object') {
            const moved = mergeObjectByKey(source[prop], destinationKey, keyToMove);
            if (moved) {
                return true;
            }
        }
    }

    return false;
}

function mergeNode(event) {
    treeObj = JSON.parse(localStorage.getItem("node"));

    const tooltip = event.target.closest(".node");
    const nodeId = +tooltip.id.substring(4);

    const destinationKey = prompt("Please enter the destinaion key value: ", "");

    if (destinationKey == "" || destinationKey == null) {
        alert("please enter valid input");
        return;
    }

    const obj = JSON.parse(localStorage.getItem("node"));
    if (mergeObjectByKey(obj, destinationKey, nodeId)) {
        localStorage.setItem("node", JSON.stringify(treeObj));
        treeContainer.innerHTML = "";
        createTree(JSON.parse(localStorage.getItem("node")), treeContainer);
        return;
    }

    alert("cannot move to the node's child");
}

function showPopover(event) {
    const popover = document.querySelector(`#${event.target.id} .popover`);
    popover.style.display = "block";
}

function createButton(id, text, clickHandler) {
    const button = document.createElement('button');
    button.setAttribute('class', 'popover-button');
    button.setAttribute('id', id);
    button.innerText = text;
    button.addEventListener('click', clickHandler);
    return button;
}

function createTree(data, parentElement) {
    for (const key in data) {
        if (key !== 'value') {
            const node = document.createElement('div');
            node.setAttribute('class', 'node');
            node.setAttribute('id', 'node' + key);
            node.innerHTML = `${data[key].value} key=${key}`;
            node.addEventListener('click', showPopover);

            const popover = document.createElement('div');
            popover.setAttribute('class', 'popover');

            const button = createButton('add-button' + key, '+', addNode);
            const removeButton = createButton('remove-button' + key, '-', removeNode);
            const moveButton = createButton('move-button' + key, 'move', moveNode);
            const mergeButton = createButton('merge-button' + key, 'merge', mergeNode);

            popover.appendChild(button);
            popover.appendChild(removeButton);
            popover.appendChild(moveButton);
            popover.appendChild(mergeButton);
            node.appendChild(popover);

            parentElement.appendChild(node);

            if (key == 1) {
                removeButton.style.display = "none";
                moveButton.style.display = "none";
                mergeButton.style.display = "none";
            }

            // console.log(nodeX, nodeY);
            createTree(data[key], node);
        }
    }
}
