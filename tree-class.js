import Node from "./node-class.js";

class Tree {
    constructor() {
        this.root = null;
        this.sortedArray = [];
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

    levelOrder(callback) {
        if(!callback) throw new Error("Callback is required!");
        if(this.root === null) return;
        const queue = [this.root];
        let qFrontIndex = 0;
        while(qFrontIndex < queue.length) {
            const current = queue[qFrontIndex];
            callback(current);
            if(current.left !== null) queue.push(current.left);
            if(current.right !== null) queue.push(current.right);
            qFrontIndex++;
        }
    }

    inOrder(callback, root = this.root) {
        if(!callback) throw new Error("Callback is required!");
        if(root === null) return;
        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right);
    }

    preOrder(callback, root = this.root) {
        if(!callback) throw new Error("Callback is required!");
        if(root === null) return;
        callback(root);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }
    
    postOrder(callback, root = this.root) {
        if(!callback) throw new Error("Callback is required!");
        if(root === null) return;
        this.postOrder(callback, root.left);
        this.postOrder(callback, root.right);
        callback(root);
    }

    height(value) {
        if(!this.find(value)) return null;
        return this.findHeight(this.find(value));
    }

    depth(value) {
        if(!this.find(value)) return null;
        return this.findDepth(value);
    }

    isBalanced() {
        if(this.root === null) return;
        const queue = [this.root];
        let qFrontIndex = 0;
        while(qFrontIndex < queue.length) {
            const current = queue[qFrontIndex];
            if(current.left !== null && current.right !== null && 
                Math.abs(this.findHeight(current.left) - 
                this.findHeight(current.right)) > 1) {
                return false;
            }
            if(current.left !== null) queue.push(current.left);
            if(current.right !== null) queue.push(current.right);
            qFrontIndex++;
        }
        return true;
    }

    rebalance() {
        if(!this.isBalanced()) {
            this.inOrder(root => {
                this.sortedArray.push(root.data);
            });
            this.root = this.buildBST(this.sortedArray);
        }
        return this.root;
    }

    getSuccessor(root) {
        root = root.right;
        while(root !== null && root.left !== null) {
            root = root.left;
        }
        return root;
    }

    findHeight(root, steps = 0, maxSteps = []) {
        if(root.left === null && root.right === null) {
            maxSteps.push(steps);
            return Math.max(...maxSteps);
        }
        if(root.left !== null) {
            this.findHeight(root.left, ++steps, maxSteps);
        } else if(root.right !== null) {
            this.findHeight(root.right, ++steps, maxSteps);
        }
        return Math.max(...maxSteps);
    }

    findDepth(value, root = this.root, steps = 0) {
        if(root.data === value) return steps;
        if(value < root.data) return this.findDepth(value, root.left, ++steps);
        if(value > root.data) return this.findDepth(value, root.right, ++steps);        
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