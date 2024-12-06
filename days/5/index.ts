import { getInputData } from "advent-of-code";

export const part1 = (input: string[]): any => {
  const pageOrderRules = new Map<string, Set<string>>();

  const validUpdates: string[] = [];

  let placeInUpdates = false;
  for (const line of input) {
    if (line === "") {
      placeInUpdates = true;
      continue;
    }

    if (placeInUpdates) {
      const pages = line.split(",");
      let isValid = true;
      for (let i = 0; i < pages.length; i++) {
        if (!pageOrderRules.has(pages[i])) {
          continue;
        }

        const currentPageRules = pageOrderRules.get(pages[i]);

        if (pages.slice(0, i).some((page) => currentPageRules?.has(page))) {
          isValid = false;
          break;
        }

        for (const page of pages.slice(i + 1)) {
          if (currentPageRules?.has(page) !== true) {
            isValid = false;
            break;
          }
        }
      }

      if (isValid) {
        validUpdates.push(line);
      }
      continue;
    }

    const [x, y] = line.split("|");
    if (pageOrderRules.has(x)) {
      pageOrderRules.get(x)?.add(y);
    } else {
      pageOrderRules.set(x, new Set([y]));
    }
  }

  let middlePageNumberSum = 0;
  for (const validUpdate of validUpdates) {
    const pages = validUpdate.split(",");
    const middle = Math.floor(pages.length / 2);
    middlePageNumberSum += parseInt(pages[middle], 10);
  }

  return middlePageNumberSum;
};

export const part2 = (input: string[]): any => {
  return 0;
};

export const getSolution = async () => {
  const input = await getInputData(2024, 5);

  console.log("Day 5:", part1(input), part2(input));
};
