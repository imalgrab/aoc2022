import input from './input';

enum Comparison {
  false = 0,
  maybe = 0.5,
  true = 1,
}

function isNumber(argument: any): argument is number {
  return typeof argument === 'number';
}

function isArray(argument: any): argument is any[] {
  return Array.isArray(argument);
}

function parseInput(): any[][] {
  return input
    .split('\n\n')
    .map((line) => line.split('\n'))
    .map(([left, right]) => [JSON.parse(left), JSON.parse(right)]);
}

function compareNumbers(left: number, right: number): Comparison {
  if (left < right) {
    return Comparison.true;
  }
  if (left === right) {
    return Comparison.maybe;
  }
  return Comparison.false;
}

function compareNumberArray(left: number, right: number[]): Comparison {
  return compareArrays([left], right);
}

function compareArrayNumber(left: number[], right: number): Comparison {
  return compareArrays(left, [right]);
}

function compareArrays(
  left: number[] | number[][],
  right: number[] | number[][]
): Comparison {
  let comparison = Comparison.maybe;

  if (left.length <= right.length) {
    for (let i = 0; i < left.length; i++) {
      const currentLeft = left[i];
      const currentRight = right[i];
      if (isNumber(currentLeft) && isNumber(currentRight)) {
        const comparison = compareNumbers(currentLeft, currentRight);
        if (comparison !== Comparison.maybe) {
          return comparison;
        }
      } else if (isNumber(currentLeft) && isArray(currentRight)) {
        comparison = compareNumberArray(currentLeft, currentRight);
        if (comparison !== Comparison.maybe) {
          return comparison;
        }
      } else if (isArray(currentLeft) && isNumber(currentRight)) {
        comparison = compareArrayNumber(currentLeft, currentRight);
        if (comparison !== Comparison.maybe) {
          return comparison;
        }
      } else if (isArray(currentLeft) && isArray(currentRight)) {
        comparison = compareArrays(currentLeft, currentRight);
        if (comparison !== Comparison.maybe) {
          return comparison;
        }
      } else {
        throw new Error('should not be here');
      }
    }
    // left side ran out of items
    if (left.length < right.length) {
      return Comparison.true;
    }
    // same length check if previous comparison makes a decision
    return comparison;
  }
  for (let i = 0; i < right.length; i++) {
    const currentLeft = left[i];
    const currentRight = right[i];
    if (isNumber(currentLeft) && isNumber(currentRight)) {
      const comparison = compareNumbers(currentLeft, currentRight);
      if (comparison !== Comparison.maybe) {
        return comparison;
      }
    } else if (isNumber(currentLeft) && isArray(currentRight)) {
      comparison = compareNumberArray(currentLeft, currentRight);
      if (comparison !== Comparison.maybe) {
        return comparison;
      }
    } else if (isArray(currentLeft) && isNumber(currentRight)) {
      comparison = compareArrayNumber(currentLeft, currentRight);
      if (comparison !== Comparison.maybe) {
        return comparison;
      }
    } else if (isArray(currentLeft) && isArray(currentRight)) {
      comparison = compareArrays(currentLeft, currentRight);
      if (comparison !== Comparison.maybe) {
        return comparison;
      }
    } else {
      throw new Error('should not be here');
    }
  }
  // right side ran out of items
  return Comparison.false;
}

function sumOfIndicesInRightOrder(): number {
  const pairs = parseInput();
  const result = pairs
    .map(([left, right], i) => {
      const result = compareArrays(left, right);
      return result;
    })
    .map((value, index) => {
      if (value === 1) {
        return index + 1;
      }
      return value;
    })
    .reduce((a, b) => a + b);
  return result;
}

const partOne = sumOfIndicesInRightOrder();
console.log(partOne);
