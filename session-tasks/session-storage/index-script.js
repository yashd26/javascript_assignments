function checkCookieExists() {
    if (document.cookie) {
        console.log(document.cookie);
        window.location.assign("./dashboard.html");
    }
}

function cookieSetter() {
    console.log("setting cookie");
        document.cookie = "login=true";
        window.location.assign("dashboard.html");
        return;
}
