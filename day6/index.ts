import input from './input';

function solve(buffer: string, distinctCount: number) {
  const unique = new Set();
  for (let i = 0; i < buffer.length; i++) {
    unique.add(buffer[i]);
    for (let j = i + 1; j < buffer.length; j++) {
      if (unique.size === distinctCount) {
        return j;
      }
      if (!unique.has(buffer[j])) {
        unique.add(buffer[j]);
      } else {
        unique.clear();
        break;
      }
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
