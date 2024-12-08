import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index.js";

const INPUT = [
  "190: 10 19",
  "3267: 81 40 27",
  "83: 17 5",
  "156: 15 6",
  "7290: 6 8 6 15",
  "161011: 16 10 13",
  "192: 17 8 14",
  "21037: 9 7 18 13",
  "292: 11 6 16 20",
];

describe("part1", () => {
  it("works", () => {
    expect(part1(INPUT)).toBe(3749);
  });
});

describe("part2", () => {
  it("works", () => {
    expect(part2(INPUT)).toBe(11387);
  });
});
