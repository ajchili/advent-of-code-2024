import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getSessionCookie = () => {
  const sessionFilePath = resolve(__dirname, "session");

  if (!existsSync(sessionFilePath)) {
    throw new Error("Session cookie missing!");
  }

  return readFileSync(sessionFilePath, {
    encoding: "utf-8",
  });
};

export const getInputData = async (
  year: number,
  day: number
): Promise<string[]> => {
  const inputDataCachePath = resolve(__dirname, `${year}-${day}.txt`);

  if (existsSync(inputDataCachePath)) {
    return readFileSync(inputDataCachePath, {
      encoding: "utf-8",
    }).split("\n");
  }

  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        Cookie: `session=${getSessionCookie()}`,
      },
    }
  );
  const input = await response.text();

  writeFileSync(inputDataCachePath, input, { encoding: "utf-8" });

  return input.split("\n");
};
