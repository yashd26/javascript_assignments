const nameField = document.getElementById("userName");
const passwordField = document.getElementById("pass");

function onLoad() {
    if (document.cookie) {
        const userName = document.cookie.substring(5);
        console.log(userName);
        const currUser = JSON.parse(localStorage.getItem(userName));
        console.log(currUser);
        if (currUser.type === "User") {
            console.log("user present");
            window.location = "userDashboard.html";
            return;
        }
    
        window.location = "adminDashboard.html";
        return;
    }
}

function checkUserExists(userName) {
        if (localStorage.getItem(userName) === null) {
            return false;
        }

        return true;
}

function login(userName, pass) {
    const currUser = JSON.parse(localStorage.getItem(userName))

    if(pass != currUser.pass) {
        alert("wrong credentials");
        throw Error("wrong credentials");
    }

    document.cookie = `user=${currUser.userName}`;
    if (currUser.type == "User") {
        window.location = "userDashboard.html";
        return;
    }

    window.location = "adminDashboard.html";
    return;
}

function handleSubmit(e) {
    console.log("submit call");
    e.preventDefault();

    const pass = passwordField.value;
    const userName = nameField.value;

    console.log(userName);

    if (!checkUserExists(userName)) {
        alert("User doesn't exists");
        return;
    }

    try{
        login(userName, pass);
    }
    catch(e) {
        console.log(e);
    }
}
