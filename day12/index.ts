import input from './input';

type Queue = number[];

type Graph = {
  adjacencyLists: number[][];
  distances: number[];
  numberOfVertices: number;
  parents: number[];
  values: string[];
};

const neighbours = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

function positionInBoundaries(
  x: number,
  y: number,
  boundaryX: number,
  boundaryY: number
): boolean {
  return x >= 0 && x <= boundaryX && y >= 0 && y <= boundaryY;
}

function indexToValue(value: string): number {
  let newValue = value;
  switch (value) {
    case 'S':
      newValue = 'a';
      break;
    case 'E':
      newValue = 'z';
      break;
    default:
      break;
  }
  return newValue.charCodeAt(0);
}

function isDirectEdge(from: string, to: string): boolean {
  const fromValue = indexToValue(from);
  const toValue = indexToValue(to);
  const valueDifference = fromValue - toValue;
  return valueDifference >= -1;
}

function parseInput(): Graph {
  const map = input.split('\n');
  const numberOfVertices = map.length * map[0].length;
  const distances = Array.from(Array(numberOfVertices));
  const parents = Array.from(Array(numberOfVertices));
  const values = Array.from(Array(numberOfVertices));
  const adjacencyLists: number[][] = Array.from(
    Array(numberOfVertices),
    () => []
  );
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const current = map[i][j];
      const currentIndex = map[i].length * i + j;
      values[currentIndex] = current;

      neighbours.forEach(([vectorX, vectorY]) => {
        const [x, y] = [i + vectorX, j + vectorY];

        const neighbour = positionInBoundaries(x, y, map.length, map[i].length)
          ? map[x][y]
          : undefined;

        if (neighbour !== undefined && isDirectEdge(current, neighbour)) {
          const neighbourIndex = map[i].length * x + y;
          adjacencyLists[currentIndex].push(neighbourIndex);
        }
      });
    }
  }
  return {
    adjacencyLists,
    distances,
    numberOfVertices,
    parents,
    values,
  };
}

function BFS(graph: Graph): void {
  const visited = Array.from(Array(graph.numberOfVertices), () => false);
  const start = graph.values.findIndex((value) => value === 'S');

  visited[start] = true;
  let queue: Queue = [start];
  graph.distances[start] = 0;
  graph.parents[start] = -1;

  while (queue.length > 0) {
    const current = queue.shift()!;

    const neighbours = graph.adjacencyLists[current];
    neighbours.forEach((neighbour) => {
      if (!visited[neighbour]) {
        graph.distances[neighbour] = graph.distances[current] + 1;
        graph.parents[neighbour] = current;
        visited[neighbour] = true;
        queue.push(neighbour);
      }
    });
  }
}

function findDistanceTo(vertex: string, graph: Graph): number {
  const vertexIndex = graph.values.findIndex((v) => v === vertex);
  const distanceToEnd = graph.distances[vertexIndex];
  return distanceToEnd;
}

const graph = parseInput();
BFS(graph);
const partOne = findDistanceTo('E', graph);
console.log(partOne);
