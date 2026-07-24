import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const htmlFiles = ["index.html", "landing.html"];
const ignoredSchemes = /^(?:https?:|mailto:|tel:|data:|javascript:)/i;
const attributePattern = /\b(href|src)\s*=\s*(["'])(.*?)\2/gi;
const idPattern = /\bid\s*=\s*(["'])(.*?)\1/gi;

const failures = [];
const htmlCache = new Map();

const decodeSafely = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const stripQuery = (value) => value.split("?")[0];

const readText = (relativePath) => {
  const normalizedPath = relativePath.replaceAll("\\", "/");

  if (htmlCache.has(normalizedPath)) {
    return htmlCache.get(normalizedPath);
  }

  const absolutePath = path.resolve(projectRoot, normalizedPath);
  const content = fs.readFileSync(absolutePath, "utf8");

  htmlCache.set(normalizedPath, content);

  return content;
};

const getDocumentIds = (relativePath) => {
  const content = readText(relativePath);
  const ids = new Set();

  for (const match of content.matchAll(idPattern)) {
    ids.add(match[2]);
  }

  return ids;
};

const resolveLocalPath = (sourceFile, targetPath) => {
  const sourceDirectory = path.dirname(path.resolve(projectRoot, sourceFile));

  if (targetPath.startsWith("/")) {
    return path.resolve(projectRoot, targetPath.slice(1));
  }

  return path.resolve(sourceDirectory, targetPath);
};

const toProjectRelativePath = (absolutePath) =>
  path.relative(projectRoot, absolutePath).replaceAll("\\", "/");

const addFailure = (sourceFile, message) => {
  failures.push(`FAIL ${sourceFile}: ${message}`);
};

const checkReference = (sourceFile, attribute, rawValue) => {
  const value = rawValue.trim();

  if (attribute === "href" && value === "") {
    addFailure(sourceFile, 'найден пустой href=""');
    return;
  }

  if (attribute === "href" && value === "#") {
    addFailure(sourceFile, 'найден одиночный href="#"');
    return;
  }

  if (value === "" || ignoredSchemes.test(value) || value.startsWith("//")) {
    return;
  }

  const hashIndex = value.indexOf("#");
  const rawPathPart = hashIndex === -1 ? value : value.slice(0, hashIndex);
  const rawHashPart = hashIndex === -1 ? "" : value.slice(hashIndex + 1);
  const decodedPathPart = decodeSafely(stripQuery(rawPathPart));
  const decodedHashPart = decodeSafely(rawHashPart);

  let targetFile = sourceFile;

  if (decodedPathPart) {
    const targetAbsolutePath = resolveLocalPath(sourceFile, decodedPathPart);
    targetFile = toProjectRelativePath(targetAbsolutePath);

    if (!fs.existsSync(targetAbsolutePath)) {
      addFailure(sourceFile, `не найден файл ${targetFile}`);
      return;
    }

    if (fs.statSync(targetAbsolutePath).isDirectory()) {
      const indexPath = path.join(targetAbsolutePath, "index.html");

      if (!fs.existsSync(indexPath)) {
        addFailure(sourceFile, `не найден index.html в каталоге ${targetFile}`);
        return;
      }

      targetFile = toProjectRelativePath(indexPath);
    }
  }

  if (!decodedHashPart) {
    return;
  }

  const extension = path.extname(targetFile).toLowerCase();

  if (extension && extension !== ".html" && extension !== ".htm") {
    addFailure(sourceFile, `якорь #${decodedHashPart} указан не для HTML-файла ${targetFile}`);
    return;
  }

  try {
    const ids = getDocumentIds(targetFile);

    if (!ids.has(decodedHashPart)) {
      addFailure(sourceFile, `не найден якорь #${decodedHashPart} в ${targetFile}`);
    }
  } catch (error) {
    addFailure(sourceFile, `не удалось проверить якорь в ${targetFile}: ${error.message}`);
  }
};

for (const htmlFile of htmlFiles) {
  try {
    const content = readText(htmlFile);

    for (const match of content.matchAll(attributePattern)) {
      checkReference(htmlFile, match[1].toLowerCase(), match[3]);
    }

    const fileFailures = failures.filter((failure) => failure.startsWith(`FAIL ${htmlFile}:`));

    if (fileFailures.length === 0) {
      console.log(`PASS ${htmlFile}`);
    }
  } catch (error) {
    addFailure(htmlFile, `файл не прочитан (${error.message})`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }

  console.error("Local link check failed");
  process.exit(1);
}

console.log("Local link check passed");
