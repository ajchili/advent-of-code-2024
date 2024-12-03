import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderString } from "nunjucks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const [_path, _scriptDir, dayNumber] = process.argv;

if (dayNumber === undefined) {
  console.log(
    "No day number provided, please provide a day number as the first argument!"
  );
  process.exit(1);
}

const packagePath = resolve(__dirname, "../../days", dayNumber);
const answerContent = renderString(
  readFileSync(resolve(__dirname, "templates/index.ts.nunjucks"), {
    encoding: "utf-8",
  }),
  { dayNumber }
);
const packageJsonContent = renderString(
  readFileSync(resolve(__dirname, "templates/package.json.nunjucks"), {
    encoding: "utf-8",
  }),
  { dayNumber }
);

if (!existsSync(packagePath)) {
  mkdirSync(packagePath);
}

writeFileSync(resolve(packagePath, "index.ts"), answerContent, {
  encoding: "utf-8",
});
writeFileSync(resolve(packagePath, "package.json"), packageJsonContent, {
  encoding: "utf-8",
});
