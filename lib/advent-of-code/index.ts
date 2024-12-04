import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const session = readFileSync(resolve(__dirname, "session"), {
  encoding: "utf-8",
});

export const getInputData = async (
  year: number,
  day: number
): Promise<string[]> => {
  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        Cookie: `session=${session}`,
      },
    }
  );
  const input = await response.text();
  return input.split("\n");
};
