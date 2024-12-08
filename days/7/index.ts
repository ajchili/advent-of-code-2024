import { getInputData } from "advent-of-code";

type ParsedInput = { testValue: number; numbers: number[] }[];

const parseInput = (input: string[]): ParsedInput => {
  const data: ParsedInput = [];

  for (const line of input) {
    if (line.length === 0) {
      continue;
    }
    const [testValue, remainingNumbers] = line.split(":");
    const numbers = remainingNumbers
      .trim()
      .split(" ")
      .map((number) => parseInt(number, 10));
    data.push({ testValue: parseInt(testValue, 10), numbers });
  }

  return data;
};

const constructPermutation = (
  length: number,
  operators: string[] = ["+", "*"]
): string[] => {
  const permutations: string[] = [];

  if (length === 1) {
    return operators;
  } else {
    for (const permutation of constructPermutation(length - 1, operators)) {
      for (const operator of operators) {
        permutations.push(permutation + operator);
      }
    }
  }

  return permutations;
};

export const part1 = (input: string[]): number => {
  let calibrationResult = 0;

  const data = parseInput(input);
  for (const { testValue, numbers } of data) {
    const permutations = constructPermutation(numbers.length - 1);
    let validTestValue = false;

    for (const permutation of permutations) {
      let runningTotal = numbers[0];
      for (let i = 0; i < permutation.length; i++) {
        const operation = permutation.charAt(i);
        if (operation === "+") {
          runningTotal += numbers[i + 1];
        } else {
          runningTotal *= numbers[i + 1];
        }
      }

      if (runningTotal === testValue) {
        validTestValue = true;
        break;
      }
    }

    if (validTestValue) {
      calibrationResult += testValue;
    }
  }

  return calibrationResult;
};

export const part2 = (input: string[]): number => {
  let calibrationResult = 0;

  const data = parseInput(input);
  for (const { testValue, numbers } of data) {
    const permutations = constructPermutation(numbers.length - 1, [
      "+",
      "*",
      "|",
    ]);
    let validTestValue = false;

    for (const permutation of permutations) {
      let runningTotal = numbers[0];
      for (let i = 0; i < permutation.length; i++) {
        const operation = permutation.charAt(i);
        if (operation === "+") {
          runningTotal += numbers[i + 1];
        } else if (operation === "*") {
          runningTotal *= numbers[i + 1];
        } else {
          runningTotal = parseInt(`${runningTotal}${numbers[i + 1]}`, 10);
        }
      }

      if (runningTotal === testValue) {
        validTestValue = true;
        break;
      }
    }

    if (validTestValue) {
      calibrationResult += testValue;
    }
  }

  return calibrationResult;
};

export const getSolution = async () => {
  const input = await getInputData(2024, 7);

  console.log("Day 7:", part1(input), part2(input));
};
