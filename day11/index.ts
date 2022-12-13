import input from './input';

type Operand = 'old' | number;
type OperationMethod = (x: number, y: number) => number;

type Operation = {
  left: Operand;
  operation: OperationMethod;
  right: Operand;
};

type Test = {
  condition: number;
  negative: number;
  positive: number;
};

type Monke = {
  index: number;
  numOfInspectedItems: number;
  operation: Operation;
  startingItems: number[];
  test: Test;
};

function stringToOperationMethod(str: string): OperationMethod {
  switch (str) {
    case '+':
      return (x, y) => x + y;
    case '*':
      return (x, y) => x * y;
    default:
      throw new Error('unknown operation');
  }
}

function stringToOperand(str: string): Operand {
  const strToNumber = Number(str);
  if (!Number.isNaN(strToNumber)) {
    return strToNumber;
  }
  if (str === 'old') {
    return str;
  }
  throw new Error('unknown operand');
}

function stringToOperation(
  leftOperand: string,
  op: string,
  rightOperand: string
): Operation {
  const operation = stringToOperationMethod(op);
  const left = stringToOperand(leftOperand);
  const right = stringToOperand(rightOperand);
  return {
    left,
    operation,
    right,
  };
}

function stringToTest(
  divisibleBy: string,
  conditionPositive: string,
  conditionNegative: string
): Test {
  const condition = Number(divisibleBy);
  const [positive] = conditionPositive.split(' ').slice(-1).map(Number);
  const [negative] = conditionNegative.split(' ').slice(-1).map(Number);
  if ([condition, positive, negative].some((num) => Number.isNaN(num))) {
    throw new Error('string to test unavailable');
  }
  return {
    condition,
    positive,
    negative,
  };
}

function parseInput(): Monke[] {
  return input
    .split('\n\n')
    .map((lines) => lines.split('\n'))
    .map((array) => {
      const [monkeyIndex, startingItems, operation, test, positive, negative] =
        array;
      const [, indexAsString] = monkeyIndex
        .split('')
        .slice(0, -1)
        .join('')
        .split(' ');

      const [, worryLevelsAsStrings] = startingItems.split(': ');
      const [, operationAsString] = operation.split(' = ');
      const [leftOperand, op, rightOperand] = operationAsString.split(' ');
      const [, divisibleByAsString] = test.split(' by ');

      const monkey: Monke = {
        index: Number(indexAsString),
        numOfInspectedItems: 0,
        operation: stringToOperation(leftOperand, op, rightOperand),
        startingItems: worryLevelsAsStrings.split(', ').map(Number),
        test: stringToTest(divisibleByAsString, positive, negative),
      };

      return monkey;
    });
}

function evaluateOperation(worryLevel: number, operation: Operation): number {
  const { left, operation: op, right } = operation;
  const leftOperand = left === 'old' ? worryLevel : left;
  const rightOperand = right === 'old' ? worryLevel : right;
  return op(leftOperand, rightOperand);
}

function performKeepAway(numOfRounds: number): Monke[] {
  const monkeys = parseInput();
  for (let i = 0; i < numOfRounds; i++) {
    let worryLevel = 0;
    monkeys.forEach((monkey) => {
      const { operation, test, startingItems } = monkey;
      while (startingItems.length > 0) {
        monkey.numOfInspectedItems++;
        const item = startingItems.shift()!;
        worryLevel = Math.floor(evaluateOperation(item, operation) / 3);
        const throwToIndex =
          worryLevel % test.condition === 0 ? test.positive : test.negative;
        monkeys[throwToIndex].startingItems.push(worryLevel);
      }
    });
  }
  return monkeys;
}

function calculateMonkeyBusiness(
  numOfRounds: number,
  shouldUseProduct?: boolean
): number {
  let monkeys: Monke[] = [];
  if (shouldUseProduct) {
    monkeys = performKeepAwayPartTwo(numOfRounds);
  } else {
    monkeys = performKeepAway(numOfRounds);
  }

  return monkeys
    .sort((a, b) => b.numOfInspectedItems - a.numOfInspectedItems)
    .slice(0, 2)
    .reduce((acc, curr) => acc * curr.numOfInspectedItems, 1);
}

const partOne = calculateMonkeyBusiness(20);
console.log(partOne);

function performKeepAwayPartTwo(numOfRounds: number): Monke[] {
  const monkeys = parseInput();
  const testConditionsProduct = monkeys
    .map((m) => m.test.condition)
    .reduce((acc, curr) => acc * curr, 1);

  for (let i = 0; i < numOfRounds; i++) {
    let worryLevel = 0;
    monkeys.forEach((monkey) => {
      const { operation, test, startingItems } = monkey;
      while (startingItems.length > 0) {
        monkey.numOfInspectedItems++;
        const item = startingItems.shift()! % testConditionsProduct;
        worryLevel = evaluateOperation(item, operation) % testConditionsProduct;
        const throwToIndex =
          worryLevel % test.condition === 0 ? test.positive : test.negative;
        monkeys[throwToIndex].startingItems.push(worryLevel);
      }
    });
  }
  return monkeys;
}

const partTwo = calculateMonkeyBusiness(10000, true);
console.log(partTwo);
