import { describe, it, expect } from "vitest";
import {
  parseInput,
  sortParsedInput,
  deriveDistanceOfLists,
  deriveSimilarityOfLists,
} from "./index";

const INPUT = "3   4\n4   3\n2   5\n1   3\n3   9\n3   3".split("\n");

describe("parseInput", () => {
  it("returns the list of provided numbers", () => {
    expect(parseInput(INPUT)).toStrictEqual([
      [3, 4, 2, 1, 3, 3],
      [4, 3, 5, 3, 9, 3],
    ]);
  });
});

describe("sortParsedInput", () => {
  it("returns a list of sorted lists in ascending order", () => {
    const parsedInput = parseInput(INPUT);
    expect(sortParsedInput(parsedInput)).toStrictEqual([
      [1, 2, 3, 3, 3, 4],
      [3, 3, 3, 4, 5, 9],
    ]);
  });
});

describe("deriveDistanceOfLists", () => {
  it("works", () => {
    const parsedInput = parseInput(INPUT);
    const sortedInput = sortParsedInput(parsedInput);
    expect(deriveDistanceOfLists(sortedInput)).toBe(11);
  });
});

describe("deriveSimilaritiesOfList", () => {
  it("works", () => {
    const parsedInput = parseInput(INPUT);
    expect(deriveSimilarityOfLists(parsedInput)).toBe(31);
  });
});
