class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

let root = null;

function height(n) {
    return n ? n.height : 0;
}

function getBalance(n) {
    return n ? height(n.left) - height(n.right) : 0;
}
function rightRotate(y) {
    let x = y.left;
    let T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = 1 + Math.max(height(y.left), height(y.right));
    x.height = 1 + Math.max(height(x.left), height(x.right));

    return x;
}

function leftRotate(x) {
    let y = x.right;
    let T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = 1 + Math.max(height(x.left), height(x.right));
    y.height = 1 + Math.max(height(y.left), height(y.right));

    return y;
}
function insert(node, key) {

    if (!node) return new Node(key);

    if (key < node.val)
        node.left = insert(node.left, key);
    else if (key > node.val)
        node.right = insert(node.right, key);
    else
        return node;

    node.height = 1 + Math.max(height(node.left), height(node.right));

    let balance = getBalance(node);

    // LL
    if (balance > 1 && key < node.left.val)
        return rightRotate(node);

    // RR
    if (balance < -1 && key > node.right.val)
        return leftRotate(node);

    // LR
    if (balance > 1 && key > node.left.val) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    // RL
    if (balance < -1 && key < node.right.val) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    return node;
}
function insertValue() {
    let val = parseInt(document.getElementById("numInput").value);
    if (!isNaN(val)) {
        root = insert(root, val);
        drawTree(root);
    }
}
function deleteValue() {
    let val = parseInt(document.getElementById("numInput").value);
    if (!isNaN(val)) {
        root = deleteNode(root, val);
        drawTree(root);
    }
}

function minValueNode(node) {
    let current = node;
    while (current.left)
        current = current.left;
    return current;
}

function deleteNode(node, key) {

    if (!node) return node;

    if (key < node.val)
        node.left = deleteNode(node.left, key);
    else if (key > node.val)
        node.right = deleteNode(node.right, key);
    else {

        if (!node.left || !node.right) {
            let temp = node.left ? node.left : node.right;

            if (!temp)
                node = null;
            else
                node = temp;
        }
        else {
            let temp = minValueNode(node.right);
            node.val = temp.val;
            node.right = deleteNode(node.right, temp.val);
        }
    }

    if (!node) return node;

    node.height = 1 + Math.max(height(node.left), height(node.right));

    let balance = getBalance(node);

    // LL
    if (balance > 1 && getBalance(node.left) >= 0)
        return rightRotate(node);

    // LR
    if (balance > 1 && getBalance(node.left) < 0) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }

    // RR
    if (balance < -1 && getBalance(node.right) <= 0)
        return leftRotate(node);

    // RL
    if (balance < -1 && getBalance(node.right) > 0) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }

    return node;
}
