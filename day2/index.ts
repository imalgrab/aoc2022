import input from "./input";

const WIN = 6;
const DRAW = 3;
const LOSE = 0;

const SCISSORS_BONUS = 3;
const PAPER_BONUS = 2;
const ROCK_BONUS = 1;

const results: Record<string, number> = {
  "A X": DRAW + ROCK_BONUS,
  "A Y": WIN + PAPER_BONUS,
  "A Z": LOSE + SCISSORS_BONUS,

  "B X": LOSE + ROCK_BONUS,
  "B Y": DRAW + PAPER_BONUS,
  "B Z": WIN + SCISSORS_BONUS,

  "C X": WIN + ROCK_BONUS,
  "C Y": LOSE + PAPER_BONUS,
  "C Z": DRAW + SCISSORS_BONUS,
};

const resultsPart2: Record<string, number> = {
  "A X": LOSE + SCISSORS_BONUS,
  "A Y": DRAW + ROCK_BONUS,
  "A Z": WIN + PAPER_BONUS,

  "B X": LOSE + ROCK_BONUS,
  "B Y": DRAW + PAPER_BONUS,
  "B Z": WIN + SCISSORS_BONUS,

  "C X": LOSE + PAPER_BONUS,
  "C Y": DRAW + SCISSORS_BONUS,
  "C Z": WIN + ROCK_BONUS,
};

function parseInput() {
  return input.trim().split("\n");
}

function calculateResult(
  game: string,
  strategy: Record<string, number>
): number {
  const result = strategy[game];
  if (result !== undefined) {
    return result;
  }
  return 0;
}

const parsedInput = parseInput();

const part1 = parsedInput
  .map((line) => calculateResult(line, results))
  .reduce((acc, curr) => curr + acc, 0);

const part2 = parsedInput
  .map((line) => calculateResult(line, resultsPart2))
  .reduce((acc, curr) => curr + acc, 0);

console.log(`My total score would be ${part1}`);

console.log(`Now, my total score would be ${part2}`);
