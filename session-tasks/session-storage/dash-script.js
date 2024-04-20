function checkCookieExists() {
    if (document.cookie.indexOf("login") == -1) {
        window.location.assign("index.html");
        return;
    }
    if (sessionStorage.getItem("color")) {
        document.body.style.backgroundColor = sessionStorage.getItem("color");
        return;
    }
}

function changeColor(e) {
    sessionStorage.setItem("color", e.target.id);
    document.body.style.backgroundColor = e.target.id;
}

function logout() {
    document.cookie = "login=true; max-age=0";
    window.location.assign("index.html");
        return;
}
