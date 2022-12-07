import input from './input';

const TOTAL_SPACE = 70000000;
const UPDATE_REQUIRED_SPACE = 30000000;

function parseInput(): string[][] {
  return input.split('\n').map((line) => line.split(' '));
}

function calculateDirectoriesSpace(): Map<string, number> {
  const commands = parseInput();
  const values = new Map<string, number>();
  let currentPath = '';

  for (let i = 0; i < commands.length; i++) {
    const [first, second, third] = commands[i];
    if (first === '$') {
      if (second === 'cd') {
        if (third === '..') {
          currentPath = currentPath.split('.').slice(0, -1).join('.');
        } else {
          if (currentPath === '') {
            currentPath = third;
          } else {
            currentPath += `.${third}`;
          }
          values.set(currentPath, 0);
        }
      } else if (second === 'ls') {
        let j = i + 1;
        let instructions: string[] = [];

        while (commands[j][0] !== '$' && j < commands.length - 1) {
          instructions.push(commands[j].join(' ').trim());
          j++;
        }

        instructions.forEach((instruction) => {
          const [left, _] = instruction.split(' ');
          if (left !== 'dir') {
            values.set(currentPath, values.get(currentPath)! + Number(left));
          }
        });
        i = j - 1;
      }
    }
  }

  [...values.keys()].forEach((k1) => {
    [...values.keys()].forEach((k2) => {
      if (k1 !== k2 && k2.includes(k1)) {
        values.set(k1, values.get(k1)! + values.get(k2)!);
      }
    });
  });

  return values;
}

function solvePartOne(values: Map<string, number>): number {
  return [...values].reduce((acc, [_, value]) => {
    if (value <= 100000) {
      return acc + value;
    }
    return acc;
  }, 0);
}

const directoriesSpace = calculateDirectoriesSpace();
const partOne = solvePartOne(directoriesSpace);
console.log(partOne);

function calculateUsedSpaceByDir(dirName: string): number {
  const result = directoriesSpace.get(dirName);
  if (result) {
    return result;
  }
  throw new Error('no such directory');
}

function findSmallestDirectoryPreventingUpdate(usedSpace: number): number {
  const unusedSpace = TOTAL_SPACE - usedSpace;
  const missingSpace = UPDATE_REQUIRED_SPACE - unusedSpace;
  const sortedSpace = [...directoriesSpace.values()].sort((v1, v2) => v1 - v2);
  const result = sortedSpace.find((x) => x >= missingSpace);

  if (result) {
    return result;
  }
  throw new Error('no such directory');
}

const usedSpace = calculateUsedSpaceByDir('/');
const partTwo = findSmallestDirectoryPreventingUpdate(usedSpace);
console.log(partTwo);
