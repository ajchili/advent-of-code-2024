import { getInputData } from "advent-of-code";

// Ideal data structure is a trie
// This is a DP problem 🫠

const cache = new Map<string, boolean>();

const validateDesign = (
  design: string,
  validPatterns: Set<string>,
  stepSize: number
): boolean => {
  console.log(design);
  if (design.length === 0) {
    throw new Error("Provided design length is invalid!");
  }
  if (cache.has(design)) {
    // console.log("hit", design, cache.get(design));
    return cache.get(design)!;
  } else if (design.length === 1) {
    return validPatterns.has(design);
  }

  let _stepSize = Math.min(design.length, stepSize);
  let stepResults: boolean[] = [];
  for (let i = 1; i <= _stepSize; i++) {
    const possiblePattern = design.slice(0, i);
    if (validPatterns.has(possiblePattern)) {
      // console.log(possiblePattern, i, design.slice(i));
      if (possiblePattern.length === design.length) {
        stepResults.push(true);
      } else {
        stepResults.push(
          validateDesign(design.slice(i), validPatterns, stepSize)
        );
      }
    }
  }

  const result = stepResults.some((stepResult) => stepResult === true);
  cache.set(design, result);

  return result;
};

export const part1 = (input: string[]): number => {
  let validPatterns = 0;
  const availablePatterns = new Set<string>();
  let maxPatternSize = 0;
  for (const pattern of input[0].split(",")) {
    const sanitizedPattern = pattern.trim();
    availablePatterns.add(sanitizedPattern);
    if (sanitizedPattern.length > maxPatternSize) {
      maxPatternSize = sanitizedPattern.length;
    }
  }

  for (const design of input.slice(2)) {
    console.log("START OF DESIGN ---- ");
    console.log(design);
    if (design.length === 0) {
      continue;
    }
    if (validateDesign(design, availablePatterns, maxPatternSize)) {
      validPatterns++;
    }
  }

  return validPatterns;
};

export const part2 = (input: string[]): any => {};

export const getSolution = async () => {
  const input = await getInputData(2024, 19);

  console.log("Day 19:", part1(input), part2(input));
};
