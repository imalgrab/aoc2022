import input from './input';

function parseInput(): string[][] {
  return input.split('\n').map((line) => line.split(','));
}

function containsOneAnother(left: string, right: string): boolean {
  const [l1, l2] = left.split('-').map((x) => parseInt(x));
  const [r1, r2] = right.split('-').map((x) => parseInt(x));
  return (l1 <= r1 && l2 >= r2) || (r1 <= l1 && r2 >= l2);
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
  const [l1, l2] = left.split('-').map((x) => parseInt(x));
  const [r1, r2] = right.split('-').map((x) => parseInt(x));
  return (l1 <= r1 && l2 >= r1) || (l1 > r1 && r2 >= l1);
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
