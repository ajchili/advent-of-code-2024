import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const data = readFileSync(resolve(__dirname, "input.txt"));

const partOne = () => {
  const MAX_MUL_STRING_LENGTH = 12; // The maximum length of a multiplication operation as described by the input (e.g. "mul(123,456)")

  const pattern = /mul\(\d{1,3},\d{1,3}\)/g;

  let total = 0;

  const matches = Array.from(data.toString().matchAll(pattern));
  let regTotal = 0;
  for (const [mul] of matches) {
    const start = mul.indexOf("(") + 1;
    const end = mul.indexOf(")");
    const [x, y] = mul.substring(start, end).split(",");
    regTotal += parseInt(x, 10) * parseInt(y, 10);
  }
  console.log(regTotal);

  const validCharacters = new Set([
    "m",
    "u",
    "l",
    "(",
    ")",
    ",",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]);

  let filteredData: string = "";

  for (const character of data.toString()) {
    if (!validCharacters.has(character)) {
      continue;
    }

    filteredData += character;
  }

  console.log(filteredData);

  let indicesToCheck: number[] = [];
  let i = 0;
  while (i < filteredData.length) {
    if (filteredData.substring(i, i + 3) === "mul") {
      indicesToCheck.push(i);
    }
    i++;
  }

  console.log(indicesToCheck);

  for (const index of indicesToCheck) {
    const maybeMulOperation = filteredData.substring(
      index,
      index + MAX_MUL_STRING_LENGTH
    );
    const mulOperationHasParentheses =
      maybeMulOperation.includes("(") && maybeMulOperation.includes(")");
    const mulOperationHasComma = maybeMulOperation.includes(",");

    if (!mulOperationHasParentheses || !mulOperationHasComma) {
      continue;
    }

    console.log(maybeMulOperation);

    let x: string = "";
    let yIndex = 4;
    let y: string = "";

    for (let i = 4; i < MAX_MUL_STRING_LENGTH; i++) {
      const character = maybeMulOperation[i];
      if (character === ",") {
        break;
      }

      if (isNaN(parseInt(character, 10))) {
        break;
      }

      x += character;
      yIndex = i + 2;
    }
    let closingParenthesisIndex = yIndex;

    for (let i = yIndex; i < MAX_MUL_STRING_LENGTH; i++) {
      const character = maybeMulOperation[i];
      if (isNaN(parseInt(character, 10))) {
        break;
      }

      y += character;
      closingParenthesisIndex = i + 1;
    }

    if (maybeMulOperation[closingParenthesisIndex] !== ")") {
      continue;
    }

    if (isNaN(parseInt(x, 10)) || isNaN(parseInt(y, 10))) {
      continue;
    }
    console.log(x, y);
    total += parseInt(x, 10) * parseInt(y, 10);
  }

  console.log(total);
};

partOne();

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

console.log(partTwo());
