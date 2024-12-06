import { getInputData } from "advent-of-code";

type PageOrderRules = Map<string, Set<string>>;

const isValidOrder = (
  pages: string[],
  pageOrderRules: PageOrderRules
): { valid: true } | { valid: false; position: { i: number; j: number } } => {
  for (let i = 0; i < pages.length; i++) {
    if (!pageOrderRules.has(pages[i])) {
      continue;
    }

    const currentPageRules = pageOrderRules.get(pages[i]);

    if (pages.slice(0, i).some((page) => currentPageRules?.has(page))) {
      const j = pages
        .slice(0, i)
        .map((page) => currentPageRules?.has(page))
        .lastIndexOf(true);
      return { valid: false, position: { i, j } };
    }

    for (let j = i + 1; j < pages.length; j++) {
      if (currentPageRules?.has(pages[j]) !== true) {
        return { valid: false, position: { i, j } };
      }
    }
  }

  return { valid: true };
};

export const part1 = (input: string[]): any => {
  const pageOrderRules: PageOrderRules = new Map();

  const validUpdates: string[] = [];

  let placeInUpdates = false;
  for (const line of input) {
    if (line === "") {
      placeInUpdates = true;
      continue;
    }

    if (placeInUpdates) {
      const pages = line.split(",");
      if (isValidOrder(pages, pageOrderRules).valid) {
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

      const wasInitiallyValid = isValidOrder(pages, pageOrderRules).valid;
      let i = 0;
      while (i < 10000) {
        const result = isValidOrder(pages, pageOrderRules);
        if (result.valid) {
          break;
        }

        let temp = pages[result.position.i];
        pages[result.position.i] = pages[result.position.j];
        pages[result.position.j] = temp;
        i++;
      }

      if (!wasInitiallyValid) {
        validUpdates.push(pages.join(","));
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

export const getSolution = async () => {
  const input = await getInputData(2024, 5);

  console.log("Day 5:", part1(input), part2(input));
};
