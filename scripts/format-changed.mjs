import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { extname, resolve } from "node:path";

const supportedExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".scss",
  ".svg",
  ".ts",
  ".tsx",
  ".xml",
  ".yaml",
  ".yml"
]);

const supportedNames = new Set([".prettierignore", ".prettierrc"]);

function runGitCommand(args) {
  const result = spawnSync("git", args, {
    encoding: "utf8",
    shell: false
  });

  if (result.error) {
    console.error(`Не удалось запустить Git: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(result.stderr.trim() || "Команда Git завершилась с ошибкой.");
    process.exit(result.status || 1);
  }

  return result.stdout
    .split(/\r?\n/)
    .map((file) => file.trim())
    .filter(Boolean);
}

function isSupportedFile(file) {
  const normalizedFile = file.replaceAll("\\", "/");
  const fileName = normalizedFile.split("/").at(-1) || "";

  return supportedExtensions.has(extname(fileName).toLowerCase()) || supportedNames.has(fileName);
}

const changedFiles = runGitCommand(["diff", "HEAD", "--name-only", "--diff-filter=ACMR"]);

const untrackedFiles = runGitCommand(["ls-files", "--others", "--exclude-standard"]);

const filesToFormat = [...new Set([...changedFiles, ...untrackedFiles])]
  .filter(isSupportedFile)
  .filter((file) => existsSync(file));

if (filesToFormat.length === 0) {
  console.log("Нет изменённых файлов для форматирования.");
  process.exit(0);
}

console.log("Форматируем только изменённые файлы:");

filesToFormat.forEach((file) => {
  console.log(`- ${file}`);
});

const prettierCli = resolve("node_modules", "prettier", "bin", "prettier.cjs");

const prettierResult = spawnSync(process.execPath, [prettierCli, "--write", ...filesToFormat], {
  stdio: "inherit",
  shell: false
});

if (prettierResult.error) {
  console.error(`Не удалось запустить Prettier: ${prettierResult.error.message}`);
  process.exit(1);
}

process.exit(prettierResult.status ?? 1);
