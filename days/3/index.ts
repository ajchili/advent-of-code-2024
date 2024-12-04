import { getInputData } from "advent-of-code";

const partOne = (input: string[]): number => {
  let total = 0;
  const pattern = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = Array.from(input.join("\n").matchAll(pattern));

  for (const [mul] of matches) {
    const start = mul.indexOf("(") + 1;
    const end = mul.indexOf(")");
    const [x, y] = mul.substring(start, end).split(",");
    total += parseInt(x, 10) * parseInt(y, 10);
  }

  return total;
};

const partTwo = (input: string[]): number => {
  let total = 0;
  let multiplicationEnabled = true;
  const pattern = /(mul\(\d{1,3},\d{1,3}\))|do\(\)|don't\(\)/g;
  const matches = input.join("\n").matchAll(pattern);

  for (const [matchedString] of matches) {
    if (matchedString === "do()") {
      multiplicationEnabled = true;
      continue;
    } else if (matchedString === "don't()") {
      multiplicationEnabled = false;
      continue;
    }

    if (!multiplicationEnabled) {
      continue;
    }

    const start = matchedString.indexOf("(") + 1;
    const end = matchedString.indexOf(")");
    const [x, y] = matchedString.substring(start, end).split(",");
    total += parseInt(x, 10) * parseInt(y, 10);
  }

  return total;
};

export const getSolution = async () => {
  const input = await getInputData(2024, 3);
  console.log("Day 3:", partOne(input), partTwo(input));
};
