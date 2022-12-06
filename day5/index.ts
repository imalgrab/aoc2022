import input from './input';

function parseInput(): [string[][], number[][]] {
  const data = input.split('\n');
  const separatorIndex = data.findIndex((x) => x === '');

  const stacks = data
    .slice(0, separatorIndex)
    .map((line) => line.split(' '))
    .reverse();

  const moves = data.slice(separatorIndex + 1).map((move) =>
    move
      .split(' ')
      .map(Number)
      .filter((x) => !isNaN(x))
  );

  const numberOfStacks = stacks[0].filter((x) => x !== '').length;
  const formattedStacks: string[][] = Array.from(
    Array(numberOfStacks),
    () => []
  );

  const formattedArray: string[][] = Array.from(
    Array(numberOfStacks),
    () => []
  );

  let spaceCount = 0;
  stacks.slice(1).forEach((line, i) => {
    line.forEach((character) => {
      if (character === '' && spaceCount < 3) {
        spaceCount++;
      } else if (spaceCount === 3) {
        formattedArray[i].push('');
        spaceCount = 0;
      } else {
        formattedArray[i].push(character);
      }
    });
  });

  formattedArray.forEach((array) => {
    array.forEach((element, i) => {
      if (element.length === 3) {
        const newElem = element[1];
        formattedStacks[i].push(newElem);
      }
    });
  });

  return [formattedStacks, moves];
}

function solvePartOne() {
  const [stacks, moves] = parseInput();

  moves.forEach(([quantity, moveFrom, moveTo]) => {
    for (let i = 0; i < quantity; i++) {
      const elem = stacks[moveFrom - 1].pop();
      if (elem) {
        stacks[moveTo - 1].push(elem);
      }
    }
  });
  return stacks.reduce((acc, currentStack) => {
    return acc + currentStack[currentStack.length - 1];
  }, '');
}

const partOne = solvePartOne();
console.log(`${partOne}`);

function solvePartTwo() {
  const [stacks, moves] = parseInput();

  moves.forEach(([quantity, moveFrom, moveTo]) => {
    const block = stacks[moveFrom - 1].splice(-quantity);
    stacks[moveTo - 1].push(...block);
  });

  return stacks.reduce((acc, currentStack) => {
    return acc + currentStack[currentStack.length - 1];
  }, '');
}

const partTwo = solvePartTwo();
console.log(`${partTwo}`);
