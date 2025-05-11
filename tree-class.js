import Node from "./node-class.js";

class Tree {
    constructor() {
        this.root = null;
    }

    buildTree(array) {
        const tidyArray = [...new Set(array)].sort((a, b) => a - b);
        return this.root = this.buildBST(tidyArray);
    }

    buildBST(array, start = 0, end = array.length - 1) {
        if(start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const root = new Node(array[mid]);
        root.left = this.buildBST(array, start, mid - 1);
        root.right = this.buildBST(array, mid + 1, end);
        return root;
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) return;
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

}

export default Tree;