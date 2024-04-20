const userListUl = document.getElementById("userList");
const courseListUl = document.getElementById("courseList");
const addCourseInput = document.getElementById("addCourseInput");
const addCourseButton = document.getElementById("addCourse");
let selectedUser;
let selectedElement = "";

function getLoggedUserName() {
    const cookie = document.cookie;
    const userName = cookie.substring(5);

    return userName;
}

function onLoad() {
    if (!document.cookie) {
        window.location = "login.html";
        return;
    }
    else if(JSON.parse(localStorage.getItem(document.cookie.substring(5))).type == "User") {
        window.location = "userDashboard.html";
        return;
    }
    
    const userList = {...localStorage};
    const userObjectList = [];
    let adminObjectList = [];

    const userName = getLoggedUserName();

    for(let key in userList) {
        const userElement = JSON.parse(userList[key]);
        if (userElement.type == "User") {
            userObjectList.push(userElement.userName);
        }
        if (userElement.userName == userName) {
            if (userElement.courses) {
                adminObjectList = [...userElement.courses];
            }
        }
    }

    for(let val of adminObjectList) {
        const userElement = document.createElement("li");
        userElement.className = "course-item";

        const userTextName = document.createTextNode(val);
        const userDiv = document.createElement("div");
        userDiv.className = "course-title";
        userDiv.append(userTextName);

        const userAction = document.createElement("div");
        userAction.className = "course-action";

        const link1Text = document.createTextNode("Assign User | ");
        const link1 = document.createElement("a");
        link1.append(link1Text);
        link1.addEventListener("click", assignUser);
        link1.style.pointerEvents="none";
        link1.style.cursor="default";
        link1.style.color = "grey";
        link1.className = "assign-user";

        const link2Text = document.createTextNode("DeAssign User | ");
        const link2 = document.createElement("a");
        link2.append(link2Text);
        link2.addEventListener("click", deAssignUser);
        link2.style.pointerEvents="none";
        link2.style.cursor="default";
        link2.style.color = "grey";
        link2.className = "deassign-user";

        const link3Text = document.createTextNode("Remove Course");
        const link3 = document.createElement("a");
        link3.append(link3Text);
        link3.addEventListener("click", removeCourse);
        link3.className = "remove-course";

        userAction.append(link1);
        userAction.append(link2);
        userAction.append(link3);

        userElement.append(userDiv);
        userElement.append(userAction);

        courseListUl.append(userElement);
    }

    for(let val of userObjectList) {
        const userElement = document.createElement("li");
        userElement.className = "user-element";

        const userTextName = document.createTextNode(val);
        const userDiv = document.createElement("div");
        userDiv.className = "course-title";
        userDiv.append(userTextName);

        userElement.append(userDiv);
        userListUl.append(userElement);

        userDiv.addEventListener("click", handleUser);
    }

    addCourseButton.addEventListener("click", addCourse);
}

function addCourse() {
    if (addCourseInput.value == "") {
        return;
    }

    const userName = getLoggedUserName();
    const currUser = JSON.parse(localStorage.getItem(userName));

    if (!currUser.courses) {
        currUser.courses = [];
    }
    if (currUser.courses.includes(addCourseInput.value)) {
        alert("Course already exists");
        return;
    }

    currUser.courses.push(addCourseInput.value);
    localStorage.setItem(userName, JSON.stringify(currUser));
    clearFeed();
    onLoad();
}

function clearFeed() {
    const prevCourseList = Array.from(document.getElementsByClassName("course-item"));
    const prevUserList = Array.from(document.getElementsByClassName("user-element"));
    
    prevCourseList.forEach(element => {
        element.remove();
    });
    prevUserList.forEach(element => {
        element.remove();
    });
}

function handleUser(e) {
    if (e.target != selectedElement) {
        e.target.style.backgroundColor = "grey";
        if (selectedElement) {
            selectedElement.style.backgroundColor = "white";
        }
    }
    const userName = e.target.textContent;
    const user = JSON.parse(localStorage.getItem(userName));
    selectedUser = user;
    selectedElement = e.target;

    const assignList = Array.from(document.getElementsByClassName("assign-user"));
    const deAssignList = Array.from(document.getElementsByClassName("deassign-user"));

    if (!user.courses) {
        assignList.forEach((element) => {
            element.style.pointerEvents="auto";
            element.style.cursor="pointer";
            element.style.color = "green";
        });

        deAssignList.forEach((element) => {
            element.style.pointerEvents="none";
            element.style.cursor="default";
            element.style.color = "grey";
        });

        return;
    }

    const userCookieName = getLoggedUserName();
    const currUser = JSON.parse(localStorage.getItem(userCookieName));

    if (!currUser.courses) {
        return;
    }

    for(let val of assignList) {
        const courseTitle = val.parentNode.parentNode.querySelector("div").textContent;
        if (!user.courses.includes(courseTitle)) {
            val.style.pointerEvents="auto";
            val.style.cursor="pointer";
            val.style.color = "green"
        }
        else {
            val.style.pointerEvents="none";
            val.style.cursor="default";
            val.style.color = "grey";
        }
    }

    for(let val of deAssignList) {
        const courseTitle = val.parentNode.parentNode.querySelector("div").textContent;
        if (user.courses.includes(courseTitle)) {
            val.style.pointerEvents="auto";
            val.style.cursor="pointer";
            val.style.color = "green"
        }
        else {
            val.style.pointerEvents="none";
            val.style.cursor="default";
            val.style.color = "grey";
        }
    }
}

function assignUser(e) {
    e.preventDefault();

    const courseTitle = e.target.parentNode.parentNode.querySelector("div").textContent;
    if (!selectedUser.courses) {
        selectedUser.courses = [];
    }
    
    selectedUser.courses.push(courseTitle);
    localStorage.setItem(selectedUser.userName, JSON.stringify(selectedUser));

    selectedUser = null;
    selectedElement = null;

    clearFeed();
    onLoad();
}

function deAssignUser(e) {
    e.preventDefault();

    const courseTitle = e.target.parentNode.parentNode.querySelector("div").textContent;
    
    const index = selectedUser.courses.indexOf(courseTitle);
if (index > -1) {
  selectedUser.courses.splice(index, 1); 
}
    localStorage.setItem(selectedUser.userName, JSON.stringify(selectedUser));

    selectedUser = null;
    selectedElement = null;

    clearFeed();
    onLoad();
}

function removeCourse(e) {
    e.preventDefault();

    const courseTitle = e.target.parentNode.parentNode.querySelector("div").textContent;
    const cookie = document.cookie;
    const userCookieName = cookie.substring(5);
    const currUser = JSON.parse(localStorage.getItem(userCookieName));

    const index = currUser.courses.indexOf(courseTitle);
if (index > -1) {
  currUser.courses.splice(index, 1); 
}
    localStorage.setItem(currUser.userName, JSON.stringify(currUser));

    const userList = {...localStorage};
    for(let key in userList) {
        if (JSON.parse(userList[key]).courses && JSON.parse(userList[key]).type == "User") {
            const userItem = JSON.parse(userList[key]);
            if (userItem.courses.includes(courseTitle)) {
                const index = userItem.courses.indexOf(courseTitle);
                userItem.courses.splice(index, 1); 
                localStorage.setItem(userItem.userName, JSON.stringify(userItem));
            }
        }
    }

    selectedUser = null;
    selectedElement = null;

    clearFeed();
    onLoad();
}

function logout() {
    const cookie = document.cookie;
    document.cookie = `${cookie}; max-age=0`;
    window.location.assign("login.html");
    return;
}