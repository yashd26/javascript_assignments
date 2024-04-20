const courseListContainer = document.getElementsByClassName("course-list")[0];

function onLoad() {
    if (!document.cookie) {
        window.location = "login.html";
        return;
    }
    else if(JSON.parse(localStorage.getItem(document.cookie.substring(5))).type == "Admin") {
        window.location = "adminDashboard.html";
        return;
    }

    const cookie = document.cookie;
    const userName = cookie.substring(5);
    
    const currUser = JSON.parse(localStorage.getItem(userName));
    const userCourseList = [...currUser.courses];

    userCourseList.forEach(element => {
        const courseElement = document.createElement("li");
        courseElement.className = "course-item";

        const courseTitle = document.createTextNode(element);
        const courseTitleElement = document.createElement("div");
        courseTitleElement.appendChild(courseTitle);
        courseTitleElement.className = "course-title";

        courseElement.append(courseTitleElement);
        courseListContainer.append(courseElement);
    });
}

function logout() {
    const cookie = document.cookie;
    document.cookie = `${cookie}; max-age=0`;
    window.location.assign("login.html");
    return;
}
