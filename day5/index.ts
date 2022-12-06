import input from './input';

type Crane = 'CrateMover2000' | 'CrateMover2001';

function parseInput(): [string[][], number[][]] {
  const data = input.split('\n\n');
  const [rawStacks, rawMoves] = data;
  const stacks = rawStacks.split('\n').reverse();
  const moves = rawMoves.split('\n').map((move) => {
    return move
      .split(' ')
      .map(Number)
      .filter((x) => !isNaN(x));
  });

  const numberOfStacks = stacks[0].split(' ').filter((x) => x !== '').length;
  const finalStacks: string[][] = Array.from(Array(numberOfStacks), () => []);

  stacks.slice(1).forEach((line) => {
    for (let i = 0; i < numberOfStacks; i++) {
      const position = 4 * i + 1;
      if (line[position] !== ' ') {
        finalStacks[i].push(line[position]);
      }
    }
  });

  return [finalStacks, moves];
}

function solve(crane: Crane) {
  const [stacks, moves] = parseInput();
  moves.forEach(([quantity, moveFrom, moveTo]) => {
    const block = stacks[moveFrom - 1].splice(-quantity);
    if (crane === 'CrateMover2000') {
      block.reverse();
    }
    stacks[moveTo - 1].push(...block);
  });
  return stacks.reduce((acc, currentStack) => acc + currentStack.pop(), '');
}

const partOne = solve('CrateMover2000');
console.log(`${partOne}`);

const partTwo = solve('CrateMover2001');
console.log(`${partTwo}`);
