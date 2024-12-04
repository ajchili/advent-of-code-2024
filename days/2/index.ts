import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = readFileSync(resolve(__dirname, "input.txt"));

export const parseReport = (report: string): number[] => {
  return report.split(" ").map((level) => parseInt(level, 10));
};

export const parseReports = (reports: string): number[][] => {
  return reports
    .split("\n")
    .filter((report) => report.length > 0)
    .map((report) => parseReport(report));
};

export const isReportSafe = (levels: number[]): boolean => {
  const shouldLevelsIncrease = levels[0] < levels[1];

  for (let i = 0; i < levels.length - 1; i++) {
    const isLevelIncreasing = levels[i + 1] - levels[i] > 0;
    const difference = Math.abs(levels[i + 1] - levels[i]);
    if (difference > 3 || difference === 0) {
      return false;
    } else if (
      (shouldLevelsIncrease && !isLevelIncreasing) ||
      (!shouldLevelsIncrease && isLevelIncreasing)
    ) {
      return false;
    }
  }

  return true;
};

export const getNumberOfSafeReports = (reports: number[][]): number => {
  return reports.reduce((numberOfSafeReports, report) => {
    if (isReportSafe(report)) {
      return numberOfSafeReports + 1;
    }
    return numberOfSafeReports;
  }, 0);
};

const reports = parseReports(data.toString());
const numberOfSafeReports = getNumberOfSafeReports(reports);

console.log(numberOfSafeReports);
