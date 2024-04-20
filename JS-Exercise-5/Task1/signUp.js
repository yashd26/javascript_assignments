const nameField = document.getElementById("userName");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("pass");
const confirmPasswordField = document.getElementById("confirmPass");
const typeField = document.getElementById("type");

function onLoad() {
    if (document.cookie) {
        const userName = document.cookie.substring(5);
        const currUser = JSON.parse(localStorage.getItem(userName));
        if (currUser.type == "User") {
            window.location = "userDashboard.html";
            return;
        }
    
        window.location = "adminDashboard.html";
        return;
    }
}

class User {
    checkUserExists() {
        if (localStorage.getItem(this.userName) === null) {
            return false;
        }

        return true;
    }
    
    validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailError = document.getElementById("emailError");

        if (!emailPattern.test(this.email)) {
            emailError.innerHTML = "Invalid email format";

            emailError.classList.remove("hide");
            emailError.classList.add("show");
            
            this.flag = false;
            return;
        }

        emailError.classList.remove("show");
        emailError.classList.add("add");
    
        return;
    }

    validatePassword() {
        const emailError = document.getElementById("passError");
        
        // Validate length
        if(this.pass.length >= 8) {
            emailError.classList.remove("show");
            emailError.classList.add("hide");

            return;
        }
            
        emailError.innerHTML = "Invalid email format";

        emailError.classList.remove("hide");
        emailError.classList.add("show");
        
        this.flag = false;
        return;
    }

    checkConfirmPassword() {
        const emailError = document.getElementById("confirmPassError");

        if (this.pass == this.confirmPass) {
            emailError.classList.remove("show");
            emailError.classList.add("hide");
        
            return;
        }
        
        emailError.innerHTML = "pass dpesnt match";

        emailError.classList.remove("hide");
        emailError.classList.add("show");

        this.flag=false;
        return;
    }

    validateData(userName, email, pass, confirmPass, type, flag = true) {
        this.flag = flag;
        this.userName = userName;
        this.email = email;
        this.pass = pass;
        this.confirmPass = confirmPass;
        this.type = type

        this.validateEmail();
        this.validatePassword();
        this.checkConfirmPassword();
    }
}

function signUp(userObj) {
    console.log(userObj.userName);
    localStorage.setItem(userObj.userName, JSON.stringify(userObj));
}

function handleSubmit(e) {
    console.log("submit call");
    e.preventDefault();

    const nameError = document.getElementById("nameError");

    const email = emailField.value;
    const pass = passwordField.value;
    const confirmPass = confirmPasswordField.value;
    const userName = nameField.value;
    const type = typeField.options[typeField.selectedIndex].text;

    currUser = new User();

    currUser.validateData(userName, email, pass, confirmPass, type);
    if (!currUser.flag) {
        console.log("not validate");
        return;
    }

    if (currUser.checkUserExists()) {
        console.log("exists");
        nameError.innerHTML = "Invalid email format";

        nameError.classList.remove("hide");
        nameError.classList.add("show");

        return;
    }

    nameError.classList.remove("show");
    nameError.classList.add("hide");

    try{
        signUp(currUser);
        console.log("added");
    }
    catch(e) {
        console.log(e);
    }

    window.location.assign("login.html");
}
