// a-z 1-26
// A-Z 27-52
import input from './input';

function parseInput(): string[] {
  return input.split('\n');
}

function findDuplicatedElement(line: string): string | undefined {
  return line
    .substring(line.length / 2)
    .split('')
    .find((character) =>
      line.substring(0, line.length / 2).includes(character)
    );
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
    const duplicatedElement = findDuplicatedElement(currentLine);
    if (duplicatedElement) {
      const priority = calculatePriority(duplicatedElement);
      return acc + priority;
    }
    return acc;
  }, 0);
}

// const part1 = solvePartOne();
// console.log(`Sum of the priorities is ${part1}`);

function parseInputPartTwo(): string[][] {
  const inputArray = input.split('\n');
  const returnArray: string[][] = [];
  for (let i = 0; i < inputArray.length; i += 3) {
    const triple = [inputArray[i], inputArray[i + 1], inputArray[i + 2]];
    returnArray.push(triple);
  }
  return returnArray;
}

function findDuplicatedElementPartTwo(array: string[]): string | undefined {
  const withoutRepetitions = array.map((line) =>
    Array.from(new Set(line.split(''))).join('')
  );

  const combined = withoutRepetitions.join('');
  const set: Record<string, number> = {};

  combined.split('').forEach((character) => {
    if (set[character] === undefined) {
      set[character] = 1;
    } else {
      set[character] += 1;
    }
  });

  return Object.entries(set).find(([k, v]) => v === 3)?.[0];
}

function solvePartTwo(): number {
  const parsedInput = parseInputPartTwo();
  return parsedInput.reduce((acc, currentArray) => {
    const duplicatedElement = findDuplicatedElementPartTwo(currentArray);
    if (duplicatedElement) {
      return acc + calculatePriority(duplicatedElement);
    }
    return acc;
  }, 0);
}

const part2 = solvePartTwo();
console.log(`Sum of the priorities of those item types is ${part2}`);
