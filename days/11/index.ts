import { getInputData } from "advent-of-code";

const stoneTransformMemo = new Map<number, number[]>();

const transformStone = (stone: number): number[] => {
  if (stoneTransformMemo.has(stone)) {
    return stoneTransformMemo.get(stone)!;
  }

  if (stone === 0) {
    stoneTransformMemo.set(0, [1]);
    return [1];
  }

  const stoneStr = stone.toString();
  if (stoneStr.length % 2 === 0) {
    const stoneStr = stone.toString();
    const left = parseInt(stoneStr.slice(0, stoneStr.length / 2), 10);
    const right = parseInt(stoneStr.slice(stoneStr.length / 2), 10);
    stoneTransformMemo.set(stone, [left, right]);
    return [left, right];
  }

  stoneTransformMemo.set(stone, [stone * 2024]);
  return [stone * 2024];
};

export const blink = (stones: number[]): number[] => {
  return stones.map(transformStone).flat();
};

const cache = new Map<string, number>();

export const better = (stone, iteration) => {
  const key = `${stone},${iteration}`;
  if (cache.has(key)) {
    return cache.get(key);
  }

  if (iteration === 0) {
    return 1;
  }

  if (stone === 0) {
    const result = better(1, iteration - 1);
    cache.set(key, result);
    return result;
  }

  const stoneStr = stone.toString();
  if (stoneStr.length % 2 === 0) {
    const left = parseInt(stoneStr.slice(0, stoneStr.length / 2), 10);
    const right = parseInt(stoneStr.slice(stoneStr.length / 2), 10);
    const result = better(left, iteration - 1) + better(right, iteration - 1);
    cache.set(key, result);
    return result;
  }

  const result = better(2024 * stone, iteration - 1);
  cache.set(key, result);
  return result;
};

export const part1 = (input: string[]): number => {
  return input[0]
    .split(" ")
    .map((num) => parseInt(num, 10))
    .map((num) => better(num, 25))
    .reduce((a, b) => a + b, 0);
};

export const part2 = (input: string[]): number => {
  return input[0]
    .split(" ")
    .map((num) => parseInt(num, 10))
    .map((num) => better(num, 75))
    .reduce((a, b) => a + b, 0);
};

export const getSolution = async () => {
  const input = await getInputData(2024, 11);

  console.log("Day 11:", part1(input), part2(input));
};
