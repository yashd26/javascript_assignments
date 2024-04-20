let treeObj = "";

$(document).ready(function () {
    const container = $('#container');

    const input = $('<input>').attr('type', 'number').attr('id', 'nodeValue');
    container.append(input);

    const addButton = $('<button>').text('Add').click(addNode);
    container.append(addButton);

    if (localStorage.getItem('nodeList')) {
        const sortButton = $('<button>').text('Create Heap').click(createMaxHeap);
        container.append(sortButton);
        treeObj = JSON.parse(localStorage.getItem("nodeList"));
        createTree(treeObj[0], "tree");
    }
});

function addNode() {
    const input = $('#nodeValue');
    const value = input.val().trim();
    if (value === '') {
        alert('Please enter a value for the node.');
        return;
    }

    let nodeList = localStorage.getItem('nodeList');
    nodeList = nodeList ? JSON.parse(nodeList) : [];

    const id = Math.random().toString(36).substring(2, 9);
    const newNode = {
        id: id,
        value: value,
        left: null,
        right: null
    };

    const nodeLength = nodeList.length;
    if (nodeLength) {
        for (let node of nodeList) {
            if (!node.left) {
                node.left = id;
                nodeList.push(newNode);
                break;
            }
            else if (!node.right) {
                node.right = id;
                nodeList.push(newNode);
                break;
            }
        }
    }
    else {
        nodeList.push(newNode);
    }

    localStorage.setItem('nodeList', JSON.stringify(nodeList));

    input.val('');

    location.reload();
}

function heapify(N, i) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    if (l < N && +treeObj[l].value > +treeObj[largest].value)
        largest = l;

    if (r < N && +treeObj[r].value > +treeObj[largest].value)
        largest = r;

    if (largest != i) {
        // const obj1 = treeObj[i];
        // const obj2 = treeObj[largest];

        // [treeObj[i].left, treeObj[largest].left] = [treeObj[largest].left, treeObj[i].left];
        // [treeObj[i].right, treeObj[largest].right] = [treeObj[largest].right, treeObj[i].right];

        // for (const node of treeObj) {
        //     if (node.left == obj1.id) {
        //         node.left = obj2.id;
        //     } else if (node.left == obj2.id) {
        //         node.left = obj1.id;
        //     }

        //     if (node.right == obj1.id) {
        //         node.right = obj2.id;
        //     } else if (node.right == obj2.id) {
        //         node.right = obj1.id;
        //     }
        // }

        var swap = treeObj[i].value;
        treeObj[i].value = treeObj[largest].value;
        treeObj[largest].value = swap;

        heapify(N, largest);
    }
}

function createMaxHeap() {
    const N = treeObj.length;
    for (var i = Math.floor(N / 2) - 1; i >= 0; i--) {
        heapify(N, i);
    }

    localStorage.setItem('nodeList', JSON.stringify(treeObj));
    location.reload();
}

function createTree(node, parentId) {
    if (!node) {
        return;
    }

    const parentElement = $(`#${parentId}`);
    let ul = "";

    if ($(`#ul${parentId}`).length) {
        ul = $(`#ul${parentId}`);
    }
    else {
        ul = $("<ul>").attr("id", `ul${parentId}`);
        parentElement.append(ul);
    }

    const li = $("<li>").attr("id", node.id);
    const a = $("<a>").text(node.value);
    li.append(a);
    ul.append(li);

    createTree(treeObj.find(obj => obj.id == node.left), node.id);
    createTree(treeObj.find(obj => obj.id == node.right), node.id);
}
