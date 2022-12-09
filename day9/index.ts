import input from './input';

type Direction = 'L' | 'U' | 'R' | 'D';
type Position = [number, number];

function parseInput(): [Direction, number][] {
  const motions: [Direction, number][] = input
    .split('\n')
    .map((line) => line.split(' '))
    .map(([direction, step]) => [direction as Direction, Number(step)]);
  return motions;
}

function adjustTailPos(headPos: Position, tailPos: Position): Position {
  const [hX, hY] = headPos;
  const [tX, tY] = tailPos;
  if (hX === tX - 2) {
    if (hY <= tY - 1) {
      return [tX - 1, tY - 1];
    }
    if (hY >= tY + 1) {
      return [tX - 1, tY + 1];
    }
    return [tX - 1, tY];
  }
  if (hX === tX + 2) {
    if (hY <= tY - 1) {
      return [tX + 1, tY - 1];
    }
    if (hY >= tY + 1) {
      return [tX + 1, tY + 1];
    }
    return [tX + 1, tY];
  }
  if (hY === tY - 2) {
    if (hX <= tX - 1) {
      return [tX - 1, tY - 1];
    }
    if (hX >= tX + 1) {
      return [tX + 1, tY - 1];
    }
    return [tX, tY - 1];
  }
  if (hY === tY + 2) {
    if (hX <= tX - 1) {
      return [tX - 1, tY + 1];
    }
    if (hX >= tX + 1) {
      return [tX + 1, tY + 1];
    }
    return [tX, tY + 1];
  }
  return tailPos;
}

function getMoveVector(direction: Direction): Position {
  switch (direction) {
    case 'L':
      return [-1, 0];
    case 'U':
      return [0, 1];
    case 'R':
      return [1, 0];
    case 'D':
      return [0, -1];
    default:
      return [0, 0];
  }
}

function setHeadPos(headPos: Position, direction: Direction): Position {
  const [mX, mY] = getMoveVector(direction);
  const [hX, hY] = headPos;
  return [hX + mX, hY + mY];
}

function findUniquePositions(): number {
  const motions = parseInput();
  let headPos: Position = [0, 0];
  let tailPos: Position = [0, 0];
  const visitedPos = new Set<string>();
  motions.forEach(([direction, steps]) => {
    for (let i = 0; i < steps; i++) {
      headPos = setHeadPos(headPos, direction);
      tailPos = adjustTailPos(headPos, tailPos);
      visitedPos.add(tailPos.join(','));
    }
  });
  return visitedPos.size;
}

const partOne = findUniquePositions();
console.log(partOne);

function getPositionAt(
  index: number,
  positions: Map<number, string>
): Position {
  return positions.get(index)!.split(',').map(Number) as Position;
}

function findUniquePositionsKnots(): number {
  const motions = parseInput();
  const positions = new Map<number, string>(
    Array.from(Array(10), (_, i) => [i, '0,0'])
  );

  let headPos: Position = [0, 0];
  const visitedPos = new Set<string>();
  motions.forEach(([direction, steps]) => {
    for (let i = 0; i < steps; i++) {
      headPos = setHeadPos(headPos, direction);
      positions.set(0, headPos.join(','));
      for (let j = 1; j < positions.size; j++) {
        const previousPos = getPositionAt(j - 1, positions);
        const currentPos = getPositionAt(j, positions);
        const newCurrentPos = adjustTailPos(previousPos, currentPos);
        positions.set(j, newCurrentPos.join(','));
        const isTail = j === positions.size - 1;
        if (isTail) {
          visitedPos.add(newCurrentPos.join(','));
        }
      }
    }
  });
  return visitedPos.size;
}

const partTwo = findUniquePositionsKnots();
console.log(partTwo);
