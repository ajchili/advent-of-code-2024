import { describe, it, expect } from "vitest";
import { blink, part1, part2 } from "./index.js";

const INPUT = ["3028 78 973951 5146801 5 0 23533 857"];

describe("blink", () => {
  it("works for test condition 1", () => {
    expect(blink([0, 1, 10, 99, 999])).toStrictEqual([
      1, 2024, 1, 0, 9, 9, 2021976,
    ]);
  });
  it("works for 7", () => {
    expect(blink([7])).toStrictEqual([14168]);
  });
});

describe("part1", () => {
  it("works", () => {
    expect(part1(INPUT)).toBe(198089);
  });
});

describe("part2", () => {
  it("works", () => {
    expect(part2(INPUT)).toBe(236302670835517);
  });
});
