// a-z 1-26
// A-Z 27-52
import input from './input';

function parseInput(): string[] {
  return input.split('\n');
}

function findCommonElements(line: string): string[] {
  const first = new Set(line.substring(0, line.length / 2).split(''));
  const second = new Set(line.substring(line.length / 2).split(''));
  const intersection = new Set(
    [...first].filter((element) => second.has(element))
  );
  return [...intersection];
}

function calculatePriority(characters: string[]): number {
  return characters.reduce((acc, current) => {
    const isUpperCase = current.toUpperCase() === current;
    if (isUpperCase) {
      return acc + current.charCodeAt(0) - 38;
    }
    return acc + current.charCodeAt(0) - 96;
  }, 0);
}

function solvePartOne(): number {
  const parsedInput = parseInput();
  return parsedInput.reduce((acc, currentLine) => {
    const commonElements = findCommonElements(currentLine);
    const priority = calculatePriority(commonElements);
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

function findCommonElementsPartTwo(array: string[]): string[] {
  const intersection = array
    .map((line) => new Set(line.split('')))
    .reduce(
      (prev, curr) => new Set([...prev].filter((element) => curr.has(element)))
    );
  return [...intersection];
}

function solvePartTwo(): number {
  const parsedInput = parseInputPartTwo();
  return parsedInput.reduce((acc, currentArray) => {
    const duplicatedElements = findCommonElementsPartTwo(currentArray);
    const priority = calculatePriority(duplicatedElements);
    return acc + priority;
  }, 0);
}

const part2 = solvePartTwo();
console.log(`Sum of the priorities of those item types is ${part2}`);
