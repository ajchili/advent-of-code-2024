import { describe, it, expect } from "vitest";
import { parseReports, isReportSafe, getNumberOfSafeReports } from "./index";

const INPUT =
  "7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9\n".split(
    "\n"
  );

describe("parseReports", () => {
  it("works", () => {
    expect(parseReports(INPUT)).toStrictEqual([
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ]);
  });
});

describe("isReportSafe", () => {
  it("returns true for all decreasing levels", () => {
    expect(isReportSafe([7, 6, 4, 2, 1])).toBeTruthy();
  });

  it("returns false for a report with more than three levels of difference (increase)", () => {
    expect(isReportSafe([1, 2, 7, 8, 9])).toBeFalsy();
  });

  it("returns false for a report with more than three levels of difference (decrease)", () => {
    expect(isReportSafe([9, 7, 6, 2, 1])).toBeFalsy();
  });

  it("returns false for a report with inconsistent levels (increasing & decreasing)", () => {
    expect(isReportSafe([1, 3, 2, 4, 5])).toBeFalsy();
  });

  it("returns false for a report when there are adjacent levels of the same value", () => {
    expect(isReportSafe([8, 6, 4, 4, 1])).toBeFalsy();
  });
});

describe("getNumberOfSafeReports", () => {
  it("works", () => {
    const reports = parseReports(INPUT);
    expect(getNumberOfSafeReports(reports)).toBe(2);
  });

  it("works with tolerance (1)", () => {
    const reports = parseReports(INPUT);
    expect(getNumberOfSafeReports(reports, 1)).toBe(4);
  });
});
