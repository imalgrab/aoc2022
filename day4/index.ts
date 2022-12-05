import input from './input';

function parseInput(): string[][] {
  return input.split('\n').map((line) => line.split(','));
}

function containsOneAnother(left: string, right: string): boolean {
  const [l1, l2] = left.split('-').map((x) => parseInt(x));
  const [r1, r2] = right.split('-').map((x) => parseInt(x));
  return (l1 <= r1 && l2 >= r2) || (r1 <= l1 && r2 >= l2);
}

function overlaps(left: string, right: string): boolean {
  const [l1, l2] = left.split('-').map((x) => parseInt(x));
  const [r1, r2] = right.split('-').map((x) => parseInt(x));
  return (l1 <= r1 && l2 >= r1) || (l1 > r1 && r2 >= l1);
}

function solve(predicate: (left: string, right: string) => boolean): number {
  const pairs = parseInput();
  return pairs.reduce((acc, curr) => {
    const [first, second] = curr;
    const result = predicate(first, second);
    return acc + Number(result);
  }, 0);
}

const partOne = solve(containsOneAnother);
console.log(`One range fully contain the other in ${partOne} assignment pairs`);

const partTwo = solve(overlaps);
console.log(`Ranges overlap in ${partTwo} assignment pairs`);
