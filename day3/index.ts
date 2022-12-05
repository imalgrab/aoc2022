// a-z 1-26
// A-Z 27-52
import input from './input';

function parseInput(): string[] {
  return input.split('\n');
}

function findCommonElement(line: string): string {
  const first = new Set(line.substring(0, line.length / 2).split(''));
  const second = new Set(line.substring(line.length / 2).split(''));
  const intersection = new Set(
    [...first].filter((element) => second.has(element))
  );
  return [...intersection][0];
}

function calculatePriority(character: string): number {
  const isUpperCase = character.toUpperCase() === character;
  if (isUpperCase) {
    return character.charCodeAt(0) - 38;
  }
  return character.charCodeAt(0) - 96;
}

function solvePartOne(): number {
  const parsedInput = parseInput();
  return parsedInput.reduce((acc, currentLine) => {
    const commonElement = findCommonElement(currentLine);
    const priority = calculatePriority(commonElement);
    return acc + priority;
  }, 0);
}

const part1 = solvePartOne();
console.log(`Sum of the priorities is ${part1}`);

function parseInputPartTwo(): string[][] {
  const inputArray = input.split('\n');
  const returnArray: string[][] = [];
  for (let i = 0; i < inputArray.length; i += 3) {
    const triple = [inputArray[i], inputArray[i + 1], inputArray[i + 2]];
    returnArray.push(triple);
  }
  return returnArray;
}

function findCommonElementPartTwo(array: string[]): string {
  const intersection = array
    .map((line) => new Set(line.split('')))
    .reduce(
      (prev, curr) => new Set([...prev].filter((element) => curr.has(element)))
    );
  return [...intersection][0];
}

function solvePartTwo(): number {
  const parsedInput = parseInputPartTwo();
  return parsedInput.reduce((acc, currentArray) => {
    const duplicatedElement = findCommonElementPartTwo(currentArray);
    return acc + calculatePriority(duplicatedElement);
  }, 0);
}

const part2 = solvePartTwo();
console.log(`Sum of the priorities of those item types is ${part2}`);
