import input from "./input";

function parseInput(): number[] {
  const calories: number[] = [];
  let caloriesSoFar = 0;
  input.split("\n").forEach((x) => {
    if (x === "") {
      calories.push(caloriesSoFar);
      caloriesSoFar = 0;
    } else {
      caloriesSoFar += parseInt(x);
    }
  });
  return calories;
}

function findMostCalories() {
  const caloriesByElves = parseInput();
  return Math.max(...caloriesByElves);
}

function findBestThree() {
  const caloriesByElves = parseInput();
  return caloriesByElves
    .sort((c1, c2) => c2 - c1)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr, 0);
}

const part1 = findMostCalories();
console.log(`That Elf is carrying ${part1} total calories`);

const part2 = findBestThree();
console.log(`Those Elves are carrying ${part2} total calories`);
