import Tree  from "./tree-class.js";

const test = new Tree();

test.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.prettyPrint();
console.log(test.depth(6344));