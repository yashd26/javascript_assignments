const idArr = ["username", "email", "pass", "confirmpass", "age"];
const inputElements = document.querySelectorAll("input");
const regex = /^[a-zA-Z]+$/;
const checkbox = document.getElementById("checkbox");
const radios = document.getElementsByTagName('input');
const radioDiv = document.getElementById("radioDiv");
const checkboxDiv = document.getElementById("checkboxDiv");
const select = document.getElementById("job");
let mailValidated = true;
let nameValidated = true;
let passValidated = true;
let confirmPassValidated = true;
let ageValidated = true;
let emptyInputValidated = true;
let emptyCheckValidated = true;
let emptyRadioValidated = true;


inputElements.forEach((inp) => {
    inp.addEventListener("blur", handleBlur);
});

function handleUserName(event) {
    
    const input = document.getElementById(event.target.id);
    const err = input.nextElementSibling;
    if (!regex.test(event.target.value)) {
        nameValidated = false;
            err.classList.remove("error");
            return;
    }

    nameValidated = true;
    if (!(err.classList.contains("error"))) {
        err.classList.add("error");
    }
    return;
}

function handleUserEmail(event) {
    console.log("handle");
    const mail = event.target.value;
    const input = document.getElementById(event.target.id);
    const err = input.nextElementSibling;    
    if (!mail.includes("@") ||
        mail.includes(" ") ||
    !mail.includes(".") ||
    mail.indexOf("@") != mail.lastIndexOf("@") || 
    mail.lastIndexOf("@") > mail.lastIndexOf(".") || 
    mail[0] == " " || mail[0] == "." || 
    mail[n - 1] == " " || mail[n - 1] == ".") {
        mailValidated = false;
        console.log("inside false");
            err.classList.remove("error");
        
    }
else{
    mailValidated = true;
    console.log("mailValidated true");
    if (!(err.classList.contains("error"))) {
        console.log("i am called");
        err.classList.add("error");
    }
}

}

function handleUserPass(event) {
    const input = document.getElementById(event.target.id);
    const err = input.nextElementSibling;
    if (event.target.value.length < 8) {
        passValidated = false;
            err.classList.remove("error");
        return;
        }

    passValidated = true;
    if (!err.classList.contains("error")) {
        err.classList.add("error");
    }
    return;
}

function handleUserConfirmPass(event) {
    const input = document.getElementById(event.target.id);
    const err = input.nextElementSibling;
    const pass = document.getElementById("pass");
    if (pass.value != event.target.value) {
            err.classList.remove("error");
            confirmPassValidated = false;
            return;
    }
confirmPassValidated = true;
if (!err.classList.contains("error")) {
    err.classList.add("error");
}
return;
    
}

function handleUserAge(event) {
    const input = document.getElementById(event.target.id);
    const err = input.nextElementSibling;
    if (event.target.value < 18 || event.target.value > 60) {
            err.classList.remove("error");
            ageValidated = false;
            return;
    }

    ageValidated = true;
    if (!err.classList.contains("error")) {
        err.classList.add("error");
    }
    return;
}

function handleBlur(event) {
if (event.target.id == "username") {
    handleUserName(event);
}
else if(event.target.id == "email") {
    console.log("email");
    handleUserEmail(event);
}
else if(event.target.id == "pass") {
    handleUserPass(event);
}
else if(event.target.id == "confirmpass") {
    handleUserConfirmPass(event);
}
else if(event.target.id == "age") {
    handleUserAge(event);
}
}

function validateEmptyInput(idArr) {
    let flag = true;

    for(const val of idArr) {
        const input = document.getElementById(val);

        if (input.value == "") {
            const err = input.nextElementSibling;
            err.classList.remove("error");
            flag = false;
        }
    }

    if (!flag) {    
        emptyInputValidated = false;
        return;
    }

    emptyInputValidated = true;
    return;
}

function validateEmptyCheck() {
    
    if (!checkbox.checked) {
        emptyCheckValidated = false;
        const err = checkboxDiv.nextElementSibling;
            err.classList.remove("error");
            return;
    }
    emptyCheckValidated = true;
    return;
}

function validateEmptyRadio() {
    
let flag = false;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
            flag = true;
        }
    }

    if (!flag) {
        emptyRadioValidated = false;
    const err = radioDiv.nextElementSibling;
    err.classList.remove("error");
    return;
    }

    emptyRadioValidated = true;
    return;
}

function validateEmptySelect() {
    let flag = false;
    for (let i = 1; i < select.options.length; i++) {
        if (select[i].checked) {
            flag = true;
        }
    }

    if (!flag) {
        emptyRadioValidated = false;
    const err = select.nextElementSibling;
    err.classList.remove("error");
    return;
    }

    emptyRadioValidated = true;
    return;
}

function validateForm(e) {
    e.preventDefault();

    validateEmptyInput(idArr);
    validateEmptyRadio();
    validateEmptyCheck();
    validateEmptySelect();

    if (mailValidated && 
        nameValidated &&
        passValidated &&
        confirmPassValidated && 
        ageValidated && 
        emptyInputValidated && 
        emptyCheckValidated && 
        emptyRadioValidated) {
            alert("succes");
        }

    return;
}
