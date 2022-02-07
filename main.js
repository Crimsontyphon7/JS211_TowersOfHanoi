'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
// * each key is an array of Numbers: 
// * A is the far-left, 
// * B is the middle, 
// * C is the far-right stack
// * Each number represents the largest to smallest tokens: 
// * 4 is the largest, 
// * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  // remove the last disk in the start stack and add it to the top of the end stack

  let piece = stacks[startStack].pop()
  stacks[endStack].push(piece)
}
const stackHasDisc = (stack) => {
  return stacks[stack].length !== 0;
}
const validStackEntry = (startStack, endStack) => {
  return stacks[startStack] !== undefined && stacks[endStack] !== undefined;
}

const validBlockMove = (startStack, endStack) => {
  // Get the value of the last block in the stacks
  let startBlockPosition = stacks[startStack].length - 1;
  let startBlockValue = stacks[startStack][startBlockPosition];

  let endBlockPosition = stacks[endStack].length - 1;
  let endBlockValue = stacks[endStack][endBlockPosition];

  // Make sure the stack you are moving to is empty or the block that you are moving to is bigger 
  // than the block you are moving
  if (!stackHasDisc(endStack)) {
    return true;
  } else {
    return startBlockValue < endBlockValue;
  }
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  // make sure the start stack is not empty so that it has a disk to move on
  // check to see if the start stack and end stack values are either a,b,c, or d
  // make sure large disk can't move on top of smaller disk
  return validStackEntry(startStack, endStack) && stackHasDisc(startStack) && validBlockMove(startStack, endStack)
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  // win the game when stack b or c has all four stacks from largest to the smallest
  const stackBString = stacks["b"].join(",")
  const stackCString = stacks["c"].join(",")
  return stackBString === '4,3,2,1' || stackCString === '4,3,2,1'
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
 if (isLegal(startStack,endStack)){
   movePiece(startStack,endStack)
   if (checkForWin()){
    return true 
   }
 }  else {
   console.log("not legal")
 }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
