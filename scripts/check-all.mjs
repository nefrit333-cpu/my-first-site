import { spawnSync } from "node:child_process";

const checks = [
  ["format:check", "Проверка форматирования"],
  ["smoke:landing", "Smoke-проверка лендинга"],
  ["check:links", "Проверка локальных ссылок"],
  ["check:html", "Проверка качества HTML"],
  ["check:seo", "Проверка SEO-метаданных"]
];

const runNpmScript = (scriptName) => {
  const npmExecPath = process.env.npm_execpath;

  if (npmExecPath) {
    return spawnSync(process.execPath, [npmExecPath, "run", scriptName], {
      stdio: "inherit"
    });
  }

  const command =
    process.platform === "win32" ? `npm.cmd run ${scriptName}` : `npm run ${scriptName}`;

  return spawnSync(command, {
    stdio: "inherit",
    shell: true
  });
};

console.log("Running quality checks...\n");

for (const [index, [scriptName, description]] of checks.entries()) {
  console.log(`${index + 1}/${checks.length} ${scriptName}`);
  console.log(description);

  const result = runNpmScript(scriptName);

  if (result.error) {
    console.error(`\nQuality check failed: ${scriptName}`);
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`\nQuality check failed: ${scriptName}`);
    process.exit(result.status ?? 1);
  }

  console.log("");
}

console.log("All quality checks passed");
