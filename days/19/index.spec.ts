import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index.js";

const INPUT = [
  "r, wr, b, g, bwu, rb, gb, br",
  "",
  "brwrr",
  "bggr",
  "gbbr",
  "rrbgbr",
  "ubwu",
  "bwurrg",
  "brgr",
  "bbrgwb",
];

describe("part1", () => {
  it("works", () => {
    expect(part1(INPUT)).toBe(6);
  });
});

describe("part2", () => {
  it("works", () => {
    expect(part2(INPUT)).toBe(0);
  });
});
