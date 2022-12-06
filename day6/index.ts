import input from './input';

function solve(buffer: string, distinctCount: number) {
  for (let i = 0; i < buffer.length; i++) {
    const substr = buffer.substring(i, i + distinctCount);
    const set = new Set([...substr]);
    if (set.size === distinctCount) {
      return i + distinctCount;
    }
  }
}

const partOne = solve(input, 4);
console.log(
  `The first start-of-packet marker is detected after ${partOne} characters processed.`
);

const partTwo = solve(input, 14);
console.log(
  `The first start-of-message marker is detected after ${partTwo} characters processed.`
);
