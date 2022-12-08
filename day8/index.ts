import input from './input';

function parseInput(): number[][] {
  return input
    .split('\n')
    .map((line) => line.split('').map((element) => Number(element)));
}

function isTreeOnEdge(
  x: number,
  y: number,
  rowLen: number,
  colLen: number
): boolean {
  return x === 0 || y === 0 || x === rowLen - 1 || y === colLen - 1;
}

function isTreeVisible(
  tree: number,
  neighbourPos: [number, number][][],
  grid: number[][]
): boolean {
  const [left, up, right, down] = neighbourPos;
  return (
    left.every(([i, j]) => grid[i][j] < tree) ||
    up.every(([i, j]) => grid[i][j] < tree) ||
    right.every(([i, j]) => grid[i][j] < tree) ||
    down.every(([i, j]) => grid[i][j] < tree)
  );
}

function calculateNeighbourPos(
  row: number,
  column: number,
  rowLen: number,
  colLen: number
): [number, number][][] {
  const left = [];
  const up = [];
  const right = [];
  const down = [];
  for (let i = 0; i < row; i++) {
    up.push([i, column]);
  }
  for (let i = row + 1; i < rowLen; i++) {
    down.push([i, column]);
  }
  for (let j = 0; j < column; j++) {
    left.push([row, j]);
  }
  for (let j = column + 1; j < colLen; j++) {
    right.push([row, j]);
  }
  left.sort(([x1, y1], [x2, y2]) => y2 - y1);
  right.sort(([x1, y1], [x2, y2]) => y1 - y2);
  up.sort(([x1, y1], [x2, y2]) => x2 - x1);
  down.sort(([x1, y1], [x2, y2]) => x1 - x2);
  return [left, up, right, down] as [number, number][][];
}

function sumVisibleTrees(): number {
  let visibleTrees = 0;
  const map = parseInput();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const tree = map[i][j];
      const rowLen = map.length;
      const colLen = map[i].length;
      const neighbourPos = calculateNeighbourPos(i, j, rowLen, colLen);
      const isOnEdge = isTreeOnEdge(i, j, rowLen, colLen);
      if (isOnEdge) {
        visibleTrees++;
      } else {
        const isVisible = isTreeVisible(tree, neighbourPos, map);
        visibleTrees += Number(isVisible);
      }
    }
  }
  return visibleTrees;
}

const partOne = sumVisibleTrees();
console.log(partOne);

function calculateScenicScore(
  tree: number,
  neighbourPos: [number, number][][],
  grid: number[][]
): number {
  return neighbourPos.reduce((acc, direction) => {
    let numOfTrees = 0;
    for (const [i, j] of direction) {
      if (grid[i][j] < tree) {
        numOfTrees++;
      } else {
        numOfTrees++;
        break;
      }
    }
    return acc * numOfTrees;
  }, 1);
}

function findHighestScenicScore(): number {
  const map = parseInput();
  const scenicScores: number[] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const tree = map[i][j];
      const rowLen = map.length;
      const colLen = map[i].length;
      const neighbourPos = calculateNeighbourPos(i, j, rowLen, colLen);
      const scenicScore = calculateScenicScore(tree, neighbourPos, map);
      scenicScores.push(scenicScore);
    }
  }
  return Math.max(...scenicScores);
}

const partTwo = findHighestScenicScore();
console.log(partTwo);
