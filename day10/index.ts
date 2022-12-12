import input from './input';

const CYCLES = [20, 60, 100, 140, 180, 220];
const BOUNDARIES = [40, 80, 120, 160, 200, 240];

type Instruction =
  | {
      operation: 'noop';
    }
  | {
      operation: 'addx';
      value: number;
    };

function parseInput(): Instruction[] {
  return input.split('\n').map((line) => {
    const [operation, value] = line.split(' ');
    switch (operation) {
      case 'noop':
        return {
          operation: 'noop',
        };
      case 'addx':
        return {
          operation: 'addx',
          value: Number(value),
        };
      default:
        throw new Error('operation not available');
    }
  });
}

function getInstructions(): number[] {
  const rawInstructions = parseInput();
  return rawInstructions.flatMap((instruction) => {
    switch (instruction.operation) {
      case 'noop':
        return 0;
      case 'addx':
        return [0, instruction.value];
    }
  });
}

function sumSignalStrengthsFor(cycles: number[]): number {
  const instructions = getInstructions();
  const sumOfSignalStrengths = cycles.reduce((sum, currentCycle) => {
    const registerValue = instructions
      .slice(0, currentCycle - 1)
      .reduce((acc, value) => acc + value, 1);
    return sum + currentCycle * registerValue;
  }, 0);
  return sumOfSignalStrengths;
}

const partOne = sumSignalStrengthsFor(CYCLES);
console.log(partOne);

enum Pixel {
  dark = '.',
  lit = '#',
}

function getPixelValue(cycle: number, sprite: number[]): Pixel {
  if (sprite.includes(cycle % 40)) {
    return Pixel.lit;
  }
  return Pixel.dark;
}

function draw(): string {
  let cycle = 0;
  let register = 1;
  let screen = '';
  const instructions = getInstructions();
  BOUNDARIES.forEach((boundary, i) => {
    const row = instructions
      .slice(i * 40, boundary)
      .reduce((acc, currValue) => {
        const sprite = [register - 1, register, register + 1];
        const pixelValue = getPixelValue(cycle, sprite);
        register += currValue;
        cycle++;
        return acc + pixelValue;
      }, '');
    screen += `${row}\n`;
  });
  return screen;
}

const partTwo = draw();
console.log(partTwo);
