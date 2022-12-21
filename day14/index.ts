import { dir } from 'console';
import input from './input';

enum Direction {
  down,
  left,
  right,
}
type Point = [number, number];

type PositionKey = string;
enum Position {
  air = '.',
  boundary = '@',
  rock = '#',
  sand = 'o',
  source = '+',
}
type Scan = Map<PositionKey, Position>;

type PostFall = [boolean, Scan];

type SimulationFunction = (
  poin: Point,
  scan: Scan,
  maxDepth?: number
) => PostFall;

const SAND_POSITION = '500,0';

function positionKeyToPoint(positionKey: PositionKey): Point {
  return positionKey.split(',').map(Number) as Point;
}

function parseInput(): Scan {
  const scan = new Map<PositionKey, Position>();
  const scanLines = input.split('\n').map((line) => line.split(' -> '));
  const [sandStartX, sandStartY] = positionKeyToPoint(SAND_POSITION);
  let minLeft = sandStartX;
  let maxRight = sandStartX;
  let maxDepth = sandStartY;
  for (let i = 0; i < scanLines.length; i++) {
    for (let j = 1; j < scanLines[i].length; j++) {
      const [startX, startY] = positionKeyToPoint(scanLines[i][j - 1]);
      const [endX, endY] = positionKeyToPoint(scanLines[i][j]);

      let [iterX, condX] = [startX, endX].sort();
      let [iterY, condY] = [startY, endY].sort();

      minLeft = Math.min(minLeft, iterX);
      maxRight = Math.max(maxRight, condX);
      maxDepth = Math.max(maxDepth, condY);

      while (iterX <= condX) {
        const key = `${iterX},${startY}`;
        if (!scan.has(key)) {
          scan.set(key, Position.rock);
        }
        iterX++;
      }

      while (iterY <= condY) {
        const key = `${startX},${iterY}`;
        if (!scan.has(key)) {
          scan.set(key, Position.rock);
        }
        iterY++;
      }
    }
  }
  for (let i = 0; i <= maxDepth; i++) {
    scan.set(`${minLeft - 1},${i}`, Position.boundary);
    scan.set(`${maxRight + 1},${i}`, Position.boundary);
  }
  for (let i = minLeft - 1; i < maxRight + 1; i++) {
    scan.set(`${i},${maxDepth + 1}`, Position.boundary);
  }
  return scan;
}

function canMove(
  from: Point,
  direction: Direction,
  scan: Scan,
  maxDepth?: number
): boolean {
  const [x, y] = from;

  switch (direction) {
    case Direction.down:
      return (
        maxDepth !== undefined && y + 1 < maxDepth && !scan.has(`${x},${y + 1}`)
      );
    case Direction.left:
      return (
        maxDepth !== undefined &&
        y + 1 < maxDepth &&
        !scan.has(`${x - 1},${y + 1}`)
      );
    case Direction.right:
      return (
        maxDepth !== undefined &&
        y + 1 < maxDepth &&
        !scan.has(`${x + 1},${y + 1}`)
      );
    default:
      return false;
  }
}

function simulateFall(currentPoint: Point, scan: Scan): PostFall {
  let [x, y] = currentPoint;

  let canMoveDown = canMove([x, y], Direction.down, scan);
  let canMoveLeft = canMove([x, y], Direction.left, scan);
  let canMoveRight = canMove([x, y], Direction.right, scan);

  while (canMoveDown || canMoveLeft || canMoveRight) {
    if (canMoveDown) {
      y++;
    } else if (canMoveLeft) {
      x--;
      y++;
    } else if (canMoveRight) {
      x++;
      y++;
    }
    canMoveDown = canMove([x, y], Direction.down, scan);
    canMoveLeft = canMove([x, y], Direction.left, scan);
    canMoveRight = canMove([x, y], Direction.right, scan);
  }

  const downBoundary = scan.get(`${x},${y + 1}`) ?? Position.air;
  const leftBoundary = scan.get(`${x - 1},${y + 1}`) ?? Position.air;
  const rightBoundary = scan.get(`${x + 1},${y + 1}`) ?? Position.air;

  const hasReachedDownBoundary =
    downBoundary === Position.boundary || downBoundary === Position.rock;

  const hasReachedHorizontalBoundary =
    leftBoundary === Position.boundary || rightBoundary === Position.boundary;

  if (hasReachedDownBoundary && hasReachedHorizontalBoundary) {
    return [true, scan];
  }

  scan.set(`${x},${y}`, Position.sand);
  return [false, scan];
}

function simulateFallingSand(
  scan: Scan,
  simulationFunction: SimulationFunction = simulateFall,
  maxDepth?: number
): Scan {
  let isSandFlowing = false;
  let currentPoint = positionKeyToPoint(SAND_POSITION);
  let currentScan = scan;

  while (!isSandFlowing) {
    let [newFlowing, newScan] = simulationFunction(
      currentPoint,
      currentScan,
      maxDepth
    );
    isSandFlowing = newFlowing;
    currentScan = newScan;
  }
  return currentScan;
}

function calculateUnitsOfSand(scan: Scan): number {
  return [...scan.values()]
    .filter((value) => value === Position.sand)
    .reduce((acc) => acc + 1, 0);
}

function simulate(
  scan: Scan,
  simulationFunction: SimulationFunction = simulateFall,
  maxDepth?: number
): number {
  const scanAfterSimulation = simulateFallingSand(
    scan,
    simulationFunction,
    maxDepth
  );
  const numberOfSandUnits = calculateUnitsOfSand(scanAfterSimulation);

  return numberOfSandUnits;
}

// const scan = parseInput();
// const part1 = simulate(scan);
// console.log(part1);

function parseInput2(): [Scan, number] {
  const scan = new Map<PositionKey, Position>();
  const scanLines = input.split('\n').map((line) => line.split(' -> '));
  const [sandStartX, sandStartY] = positionKeyToPoint(SAND_POSITION);
  let minLeft = sandStartX;
  let maxRight = sandStartX;
  let maxDepth = sandStartY;
  for (let i = 0; i < scanLines.length; i++) {
    for (let j = 1; j < scanLines[i].length; j++) {
      const [startX, startY] = positionKeyToPoint(scanLines[i][j - 1]);
      const [endX, endY] = positionKeyToPoint(scanLines[i][j]);

      let [iterX, condX] = [startX, endX].sort();
      let [iterY, condY] = [startY, endY].sort();

      minLeft = Math.min(minLeft, iterX);
      maxRight = Math.max(maxRight, condX);
      maxDepth = Math.max(maxDepth, condY);

      while (iterX <= condX) {
        const key = `${iterX},${startY}`;
        if (!scan.has(key)) {
          scan.set(key, Position.rock);
        }
        iterX++;
      }

      while (iterY <= condY) {
        const key = `${startX},${iterY}`;
        if (!scan.has(key)) {
          scan.set(key, Position.rock);
        }
        iterY++;
      }
    }
  }

  return [scan, maxDepth + 2];
}

function simulateFall2(
  currentPoint: Point,
  scan: Scan,
  maxDepth?: number
): PostFall {
  let [x, y] = currentPoint;

  let canMoveDown = canMove([x, y], Direction.down, scan, maxDepth);
  let canMoveLeft = canMove([x, y], Direction.left, scan, maxDepth);
  let canMoveRight = canMove([x, y], Direction.right, scan, maxDepth);

  while (canMoveDown || canMoveLeft || canMoveRight) {
    if (canMoveDown) {
      y++;
    } else if (canMoveLeft) {
      x--;
      y++;
    } else if (canMoveRight) {
      x++;
      y++;
    }
    canMoveDown = canMove([x, y], Direction.down, scan, maxDepth);
    canMoveLeft = canMove([x, y], Direction.left, scan, maxDepth);
    canMoveRight = canMove([x, y], Direction.right, scan, maxDepth);
  }

  if (`${x},${y}` === SAND_POSITION) {
    scan.set(`${x},${y}`, Position.sand);
    return [true, scan];
  }

  scan.set(`${x},${y}`, Position.sand);
  return [false, scan];
}

const [scan2, maxDepth] = parseInput2();
const part2 = simulate(scan2, simulateFall2, maxDepth);
console.log(part2);
