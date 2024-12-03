import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = readFileSync(resolve(__dirname, "input.txt"));

const partOne = () => {
  let total = 0;
  const pattern = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = Array.from(data.toString().matchAll(pattern));

  for (const [mul] of matches) {
    const start = mul.indexOf("(") + 1;
    const end = mul.indexOf(")");
    const [x, y] = mul.substring(start, end).split(",");
    total += parseInt(x, 10) * parseInt(y, 10);
  }

  return total;
};

const partTwo = () => {
  let total = 0;
  let multiplicationEnabled = true;
  const pattern = /(mul\(\d{1,3},\d{1,3}\))|do\(\)|don't\(\)/g;
  const matches = data.toString().matchAll(pattern);

  for (const [matchedString] of matches) {
    if (matchedString === "do()") {
      multiplicationEnabled = true;
      continue;
    } else if (matchedString === "don't()") {
      multiplicationEnabled = false;
      continue;
    }

    if (!multiplicationEnabled) {
      continue;
    }

    const start = matchedString.indexOf("(") + 1;
    const end = matchedString.indexOf(")");
    const [x, y] = matchedString.substring(start, end).split(",");
    total += parseInt(x, 10) * parseInt(y, 10);
  }

  return total;
};

console.log(partOne(), partTwo());
