import input from './input';

type Pair<T> = [T, T];

type Packet = any[];
type PacketPair = Pair<Packet>;
type Packets = PacketPair[];

enum Comparison {
  false = 0,
  maybe = 0.5,
  true = 1,
}

function isPacketEqual(packet1: Packet, packet2: Packet): boolean {
  return JSON.stringify(packet1) === JSON.stringify(packet2);
}

function isNumber(argument: any): argument is number {
  return typeof argument === 'number';
}

function isArray(argument: any): argument is any[] {
  return Array.isArray(argument);
}

function parseInput(): Packets {
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

function compareNumberArray(left: number, right: any[]): Comparison {
  return compareArrays([left], right);
}

function compareArrayNumber(left: any[], right: number): Comparison {
  return compareArrays(left, [right]);
}

function compareArrays(left: any[], right: any[]): Comparison {
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

function sumOfIndicesInRightOrder(packets: Packets): number {
  const result = packets
    .map(([left, right]) => compareArrays(left, right))
    .reduce((acc, curr, index) => {
      if (curr === Comparison.true) {
        return acc + index + 1;
      }
      return acc;
    }, 0);
  return result;
}

const packetPairs = parseInput();

const partOne = sumOfIndicesInRightOrder(packetPairs);
console.log(partOne);

function findDecoderKey(packets: Packets): number {
  const [firstDivider, secondDivider]: PacketPair = [[[2]], [[6]]];
  const packetPairsWithDividers = [...packets, [firstDivider, secondDivider]];

  const decoderKey = packetPairsWithDividers
    .flat()
    .sort((left, right) => {
      const comparison = compareArrays(left, right);
      if (comparison === Comparison.true) {
        return -1;
      }
      return 1;
    })
    .reduce((currentDecoderKey, packet, index) => {
      const packetIsFirstDivider = isPacketEqual(packet, firstDivider);
      const packetIsSecondDivider = isPacketEqual(packet, secondDivider);
      if (packetIsFirstDivider || packetIsSecondDivider) {
        return currentDecoderKey * (index + 1);
      }
      return currentDecoderKey;
    }, 1);

  return decoderKey;
}

const partTwo = findDecoderKey(packetPairs);
console.log(partTwo);
