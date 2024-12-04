import { getInputData } from "advent-of-code";

export const part1 = (input: string[]): number => {
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const isMatchRight = input[i].substring(j, j + 4) === "XMAS";
      const isMatchLeft =
        j - 3 >= 0 &&
        input[i][j] + input[i][j - 1] + input[i][j - 2] + input[i][j - 3] ===
          "XMAS";

      const isMatchUp =
        i - 3 >= 0 &&
        input[i][j] + input[i - 1][j] + input[i - 2][j] + input[i - 3][j] ===
          "XMAS";
      const isMatchDown =
        i + 3 < input.length &&
        input[i][j] + input[i + 1][j] + input[i + 2][j] + input[i + 3][j] ===
          "XMAS";

      if (isMatchRight) {
        count++;
      }
      if (isMatchLeft) {
        count++;
      }
      if (isMatchDown) {
        count++;
      }
      if (isMatchUp) {
        count++;
      }

      // up left
      if (
        i - 3 >= 0 &&
        j - 3 >= 0 &&
        input[i][j] +
          input[i - 1][j - 1] +
          input[i - 2][j - 2] +
          input[i - 3][j - 3] ===
          "XMAS"
      ) {
        count++;
      }
      // up right
      if (
        i - 3 >= 0 &&
        j + 3 < input[i].length &&
        input[i][j] +
          input[i - 1][j + 1] +
          input[i - 2][j + 2] +
          input[i - 3][j + 3] ===
          "XMAS"
      ) {
        count++;
      }
      // down left
      if (
        i + 3 < input.length &&
        j - 3 >= 0 &&
        input[i][j] +
          input[i + 1][j - 1] +
          input[i + 2][j - 2] +
          input[i + 3][j - 3] ===
          "XMAS"
      ) {
        count++;
      }
      if (
        i + 3 < input.length &&
        j + 3 < input[i].length &&
        input[i][j] +
          input[i + 1][j + 1] +
          input[i + 2][j + 2] +
          input[i + 3][j + 3] ===
          "XMAS"
      ) {
        count++;
      }
    }
  }

  return count;
};

export const part2 = (input: string[]): number => {
  let count = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const centerChar = input[i][j];
      if (centerChar !== "A") {
        continue;
      } else if (
        i === 0 ||
        i === input.length - 1 ||
        j === 0 ||
        j === input[i].length - 1
      ) {
        continue;
      }

      const topLeftChar = input[i - 1][j - 1];
      const bottomLeftChar = input[i + 1][j - 1];
      const topRightChar = input[i - 1][j + 1];
      const bottomRightChar = input[i + 1][j + 1];

      if (
        (topLeftChar + centerChar + bottomRightChar === "MAS" ||
          topLeftChar + centerChar + bottomRightChar === "SAM") &&
        (topRightChar + centerChar + bottomLeftChar === "MAS" ||
          topRightChar + centerChar + bottomLeftChar === "SAM")
      ) {
        count++;
      }
    }
  }
  return count;
};

export const getSolution = async () => {
  const input = await getInputData(2024, 4);

  console.log("Day 4:", part1(input), part2(input));
};
