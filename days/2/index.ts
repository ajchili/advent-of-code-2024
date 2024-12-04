import { getInputData } from "advent-of-code";

export const parseReport = (report: string): number[] => {
  return report.split(" ").map((level) => parseInt(level, 10));
};

export const parseReports = (reports: string[]): number[][] => {
  return reports
    .filter((report) => report.length > 0)
    .map((report) => parseReport(report));
};

export const isReportSafe = (levels: number[]): boolean => {
  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < levels.length; i++) {
    const x = levels[i - 1];
    const y = levels[i];
    const levelIncreases = y - x > 0;
    const difference = Math.abs(x - y);
    if (difference === 0 || difference > 3) {
      return false;
    }
    if (!levelIncreases) {
      increasing = false;
    } else {
      decreasing = false;
    }
  }

  return increasing || decreasing;
};

export const getNumberOfSafeReports = (
  reports: number[][],
  tolerance: 0 | 1 = 0
): number => {
  return reports.reduce((numberOfSafeReports, level) => {
    let reportIsSafe: boolean = false;
    if (tolerance === 0) {
      reportIsSafe = isReportSafe(level);
    } else {
      const permutations: number[][] = [];
      for (let i = 0; i < level.length; i++) {
        permutations.push([...level.slice(0, i), ...level.slice(i + 1)]);
      }
      reportIsSafe = permutations.some((permutation) =>
        isReportSafe(permutation)
      );
    }

    return reportIsSafe ? numberOfSafeReports + 1 : numberOfSafeReports;
  }, 0);
};

export const getSolution = async () => {
  const input = await getInputData(2024, 2);

  const reports = parseReports(input);

  console.log(
    "Day 2:",
    getNumberOfSafeReports(reports),
    getNumberOfSafeReports(reports, 1)
  );
};
