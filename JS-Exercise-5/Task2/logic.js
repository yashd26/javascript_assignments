const nameInput = document.getElementById("name");
const suggestionList = document.getElementById("suggestionList");

var namesArray = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Williams",
    "Christopher Brown",
    "Jessica Jones",
    "Matthew Davis",
    "Sarah Taylor",
    "Daniel Martinel",
    "Olivia Anderson",
    "David Wilson",
    "Emma Moore",
    "Joseph Taylor",
    "Sophia Thomas",
    "Andrew Jackson",
    "Isabella White",
    "James Harris",
    "Madison Martin",
    "Joshua Thompson",
    "Ava Garcia",
    "Ryan Lee",
    "Mia Rodriguez",
    "William Perez",
    "Charlotte Hernandez",
    "Ethan Young"
  ];  

nameInput.addEventListener("input", handleStateChange);

function checkInpExists(nameString, inputVal) {
    if (nameString.toLowerCase().includes(inputVal.toLowerCase())) {
        return true;
    }

    return false;
}

function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

function handleStateChange(e) {
    const suggestedList = Array.from(document.getElementsByClassName("suggest"));
    const inputVal = this.value;

    suggestedList.forEach((element) => {
        element.remove();
    });

    if (!inputVal || inputVal.length < 2) {
        return;
    }
    for(let val of namesArray) {
        if (!checkInpExists(val, inputVal)) {
            continue;
        }

        const indices = getIndicesOf(inputVal, val);
        const repeatCount = indices.length;

        const suggestName = document.createElement("div");
        suggestName.className = "suggest";

        let nameNode = "";

        if (repeatCount == 1) {
            nameNode += val.substring(0, indices[0]);
            nameNode += `<span>${val.substring(indices[0], indices[0] + inputVal.length)}</span>`;
            nameNode += val.substring(indices[0] + inputVal.length);
        }else {
            nameNode += val.substring(0, indices[0]);
            for(let i = 0; i < repeatCount - 1; ++i) {
                nameNode += `<span>${val.substring(indices[i], indices[i] + inputVal.length)}</span>`;
                nameNode += val.substring(indices[i] + inputVal.length, indices[i + 1]);
            }
            nameNode += `<span>${val.substring(indices[repeatCount - 1], indices[repeatCount - 1] + inputVal.length)}</span>`;
            if (!(indices[repeatCount - 1] + inputVal.length == val.length)) {
                nameNode += val.substring(indices[repeatCount - 1] + inputVal.length);
            }
        }

        suggestName.innerHTML = nameNode;
        suggestionList.appendChild(suggestName);
    }
}
