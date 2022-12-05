import input from './input';

function parseInput(): string[][] {
  return input.split('\n').map((line) => line.split(','));
}

function containsOneAnother(left: string, right: string): boolean {
  const [leftStart, leftEnd] = left.split('-').map((value) => parseInt(value));
  const [rightStart, rightEnd] = right
    .split('-')
    .map((value) => parseInt(value));
  if (leftStart <= rightStart && leftEnd >= rightEnd) {
    return true;
  }
  if (rightStart <= leftStart && rightEnd >= leftEnd) {
    return true;
  }
  return false;
}

function solvePartOne() {
  const pairs = parseInput();
  return pairs.reduce((acc, curr) => {
    const [first, second] = curr;
    const result = containsOneAnother(first, second);
    return acc + Number(result);
  }, 0);
}

const partOne = solvePartOne();
console.log(`One range fully contain the other in ${partOne} assignment pairs`);

function overlaps(left: string, right: string): boolean {
  const [leftStart, leftEnd] = left.split('-').map((value) => parseInt(value));
  const [rightStart, rightEnd] = right
    .split('-')
    .map((value) => parseInt(value));
  if (leftStart < rightStart) {
    return leftEnd >= rightStart;
  }
  return rightEnd >= leftStart;
}

function solvePartTwo() {
  const pairs = parseInput();
  return pairs.reduce((acc, curr) => {
    const [first, second] = curr;
    const result = overlaps(first, second);
    return acc + Number(result);
  }, 0);
}

const partTwo = solvePartTwo();
console.log(`Ranges overlap in ${partTwo} assignment pairs`);
