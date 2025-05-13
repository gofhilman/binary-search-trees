import Tree  from "./tree-class.js";

function createRandomArray(elementNumber) {
    const randomArray = [];
    for(let iter = 0; iter < elementNumber; iter++) {
        randomArray.push(Math.floor(100 * Math.random()));
    }
    return randomArray;
}

const test = new Tree();

test.buildTree(createRandomArray(30));
test.prettyPrint();
console.log(test.isBalanced());
for(let iter = 0; iter < 20; iter++) {
    test.insert(Math.floor(101 + 99 * Math.random()));
}
test.prettyPrint();
console.log(test.isBalanced());
test.rebalance();
test.prettyPrint();
console.log(test.isBalanced());
test.levelOrder(node => console.log(node.data));
console.log();
test.preOrder(node => console.log(node.data));
console.log();
test.postOrder(node => console.log(node.data));
console.log();
test.inOrder(node => console.log(node.data));