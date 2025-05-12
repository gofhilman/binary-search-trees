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

    insert(value, root = this.root) {
        if(root === null) return new Node(value);
        if(value < root.data) root.left = this.insert(value, root.left);
        if(value > root.data) root.right = this.insert(value, root.right);
        return root;
    }
    
    deleteItem(value, root = this.root) {
        if(root === null) return root;
        if(value < root.data) {
            root.left = this.deleteItem(value, root.left);
        } else if(value > root.data) {
            root.right = this.deleteItem(value, root.right);
        } else {
            if(root.left === null) return root.right;
            if(root.right === null) return root.left;
            const successor = this.getSuccessor(root);
            root.data = successor.data;
            root.right = this.deleteItem(successor.data, root.right)
        }
        return root;
    }

    find(value, root = this.root) {
        if(root === null  || root.data === value) return root;
        if(value < root.data) return this.find(value, root.left);
        if(value > root.data) return this.find(value, root.right);
    }

    getSuccessor(root) {
        root = root.right;
        while(root !== null && root.left !== null) {
            root = root.left;
        }
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