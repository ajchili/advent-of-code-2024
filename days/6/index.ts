import { getInputData } from "advent-of-code";

const getGuardPosition = (input: string[]): [number, number] => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i].charAt(j) === "^") {
        return [i, j];
      }
    }
  }

  return [-1, -1];
};

export const part1 = (input: string[]): any => {
  const positionsVisited = new Set<string>();

  let [y, x] = getGuardPosition(input);
  let xDirection = 0;
  let yDirection = -1;

  while (y > 0 && y < input.length && x > 0 && x < input[y].length) {
    if (input[y + yDirection]?.charAt(x + xDirection) === "#") {
      if (xDirection === 0 && yDirection === -1) {
        xDirection = 1;
        yDirection = 0;
      } else if (xDirection === 1 && yDirection === 0) {
        xDirection = 0;
        yDirection = 1;
      } else if (xDirection === 0 && yDirection === 1) {
        xDirection = -1;
        yDirection = 0;
      } else {
        xDirection = 0;
        yDirection = -1;
      }
      continue;
    }

    positionsVisited.add(`${x},${y}`);
    x += xDirection;
    y += yDirection;
  }

  return positionsVisited.size;
};

export const part2 = (input: string[]): any => {
  return 0;
};

export const getSolution = async () => {
  const input = await getInputData(2024, 6);

  console.log("Day 6:", part1(input), part2(input));
};
