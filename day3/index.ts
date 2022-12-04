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

const part1 = solvePartOne();
console.log(`Sum of the priorities is ${part1}`);
