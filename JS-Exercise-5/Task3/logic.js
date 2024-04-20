const box2ColorList = ["red", "blue", "green"];
const box4ColorList = ["red", "blue", "orange", "green", "yellow"];
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");

let box2ColorIdx = 0;
let box4ColorIdx = 0;
let box4ColorInterval;

function onLoad() {
    alert("hello user");
    updateBox1();
}

function box2ChangeColor() {
    box2.style.backgroundColor = box2ColorList[box2ColorIdx];
    if (box2ColorIdx == 2) {
        box2ColorIdx = 0;
    }
    else {
        box2ColorIdx++;
    }
}

function box4ChangeColor() {
    if (box4ColorIdx == 4) {
        box4ColorIdx = 0;
    }
    else {
        box4ColorIdx++;
    }
    box4.style.backgroundColor = box4ColorList[box4ColorIdx];
}

function updateBox1() {
    let box1TextNode = document.createTextNode("Click Me First");
    let box1Para = document.createElement("p");
    box1Para.append(box1TextNode);
    let box2ColorInterval = setInterval(box2ChangeColor, 3000);
    box2ChangeColor();
    box1.append(box1Para);

    box1.addEventListener("click", updateBox3);
}

function updateBox3() {
    box1.removeEventListener("click", updateBox3);
    let box3TextNode = document.createTextNode("Oops something wrong?");
    let box3Para = document.createElement("p");
    box3Para.append(box3TextNode);
    box4ChangeColor();
    box4ColorInterval = setInterval(box4ChangeColor, 5000);
    box3.append(box3Para);

    document.body.addEventListener('keydown', function(event) { 
        const key = event.key; 
        switch (key) { 
            case "ArrowLeft":    
                changePreviousColor();
                break; 
            case "ArrowRight":  
                changeNextColor();
                break; 
            case "ArrowUp": 
                changeNextColor();
                break; 
            case "ArrowDown": 
                changePreviousColor();
                break; 
        } 
    }); 
}

function changeNextColor() {
    clearInterval(box4ColorInterval);
    box4ChangeColor();
    box4ColorInterval = setInterval(box4ChangeColor, 5000);
}

function changePreviousColor() {
    clearInterval(box4ColorInterval);
    box4ChangePreviousColor();
    box4ColorInterval = setInterval(box4ChangeColor, 5000);
}

function box4ChangePreviousColor() {
    if (box4ColorIdx == 0) {
        box4ColorIdx = 4;
    }
    else {
        box4ColorIdx--;
    }
    box4.style.backgroundColor = box4ColorList[box4ColorIdx];
}
