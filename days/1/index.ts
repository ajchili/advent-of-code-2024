import { getInputData } from "advent-of-code";

type ParsedInput = [number[], number[]];

export const parseInput = (input: string[]): ParsedInput => {
  const result: ParsedInput = [[], []];

  for (const line of input) {
    if (line.length === 0) {
      continue;
    }

    const [left, right] = line.split("   ");
    result[0].push(parseInt(left, 10));
    result[1].push(parseInt(right, 10));
  }
  return result;
};

export const sortParsedInput = (parsedInput: ParsedInput): ParsedInput => {
  return [
    parsedInput[0].sort((a, b) => a - b),
    parsedInput[1].sort((a, b) => a - b),
  ];
};

export const deriveDistanceOfLists = (lists: ParsedInput): number => {
  let distance = 0;
  for (let i = 0; i < lists[0].length; i++) {
    distance += Math.abs(lists[0][i] - lists[1][i]);
  }

  return distance;
};

export const deriveSimilarityOfLists = (lists: ParsedInput): number => {
  let similarity = 0;

  for (const number of lists[0]) {
    let instances = 0;
    for (let i = 0; i < lists[1].length; i++) {
      if (lists[1][i] === number) {
        instances++;
      }
    }

    similarity += number * instances;
  }

  return similarity;
};

export const getSolution = async () => {
  const input = await getInputData(2024, 1);
  const parsedInput = parseInput(input);
  const sortedInput = sortParsedInput(parsedInput);
  const distance = deriveDistanceOfLists(sortedInput);
  const similarity = deriveSimilarityOfLists(parsedInput);

  console.log("Day 1:", distance, similarity);
};
