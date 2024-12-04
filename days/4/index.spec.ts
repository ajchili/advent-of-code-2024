import { describe, it, expect } from "vitest";
import { part2, part1 } from ".";

const INPUT = [
  "MMMSXXMASM",
  "MSAMXMSMSA",
  "AMXSXMAAMM",
  "MSAMASMSMX",
  "XMASAMXAMM",
  "XXAMMXXAMA",
  "SMSMSASXSS",
  "SAXAMASAAA",
  "MAMMMXMMMM",
  "MXMXAXMASX",
];
const REDUCED_INPUT = [
  "....XXMAS.",
  ".SAMXMS...",
  "...S..A...",
  "..A.A.MS.X",
  "XMASAMX.MM",
  "X.....XA.A",
  "S.S.S.S.SS",
  ".A.A.A.A.A",
  "..M.M.M.MM",
  ".X.X.XMASX",
];
const REDUCED_INPUT_2 = [
  ".M.S......",
  "..A..MSMS.",
  ".M.S.MAA..",
  "..A.ASMSM.",
  ".M.S.M....",
  "..........",
  "S.S.S.S.S.",
  ".A.A.A.A..",
  "M.M.M.M.M.",
  "..........",
];

describe("part1", () => {
  it("finds horizontal matches", () => {
    expect(part1(["XMAS"])).toBe(1);
    expect(part1(["XMASS"])).toBe(1);
    expect(part1(["SAMX"])).toBe(1);
    expect(part1(["SAMXS"])).toBe(1);
    expect(part1(["XMASAMX"])).toBe(2);
    expect(part1(["SAMXMAS"])).toBe(2);
  });

  it("finds vertical matches", () => {
    expect(part1(["X", "M", "A", "S"])).toBe(1);
    expect(part1(["X", "M", "A", "S"].reverse())).toBe(1);
  });

  it("finds diagonal matches", () => {
    expect(part1(["X___", "_M__", "__A_", "___S"])).toBe(1);
    expect(part1(["S___", "_A__", "__M_", "___X"])).toBe(1);
    expect(part1(["X___", "_M__", "__A_", "___S"].reverse())).toBe(1);
    expect(part1(["S___", "_A__", "__M_", "___X"].reverse())).toBe(1);
  });

  it("works", () => {
    expect(part1(INPUT)).toBe(18);
    expect(part1(REDUCED_INPUT)).toBe(18);
  });
});

describe("part2", () => {
  it("works", () => {
    expect(part2(INPUT)).toBe(9);
    expect(part2(REDUCED_INPUT_2)).toBe(9);
  });
});
