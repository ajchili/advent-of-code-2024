import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index.js";

const INPUT = [
  "....#.....",
  ".........#",
  "..........",
  "..#.......",
  ".......#..",
  "..........",
  ".#..^.....",
  "........#.",
  "#.........",
  "......#...",
];

describe("part1", () => {
  it("works", () => {
    expect(part1(INPUT)).toBe(41);
  });
});

describe("part2", () => {
  it("works", () => {
    expect(part2(INPUT)).toBe(0);
  });
});
