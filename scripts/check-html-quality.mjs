import fs from "node:fs";

const htmlFiles = ["index.html", "landing.html"];
const failures = [];

const addFailure = (file, message) => {
  failures.push(`FAIL ${file}: ${message}`);
};

const getAttribute = (tag, name) => {
  const pattern = new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i");
  const match = tag.match(pattern);
  return match ? match[2].trim() : null;
};

const hasAttribute = (tag, name) => new RegExp(`\\b${name}(?:\\s*=|\\s|>)`, "i").test(tag);

const isWrappedByLabel = (html, tagIndex) => {
  const before = html.slice(0, tagIndex);
  const lastLabelOpen = before.lastIndexOf("<label");
  const lastLabelClose = before.lastIndexOf("</label>");

  if (lastLabelOpen === -1 || lastLabelOpen < lastLabelClose) {
    return false;
  }

  const closeAfterControl = html.indexOf("</label>", tagIndex);
  return closeAfterControl !== -1;
};

for (const file of htmlFiles) {
  let html;

  try {
    html = fs.readFileSync(file, "utf8");
  } catch (error) {
    addFailure(file, `файл не прочитан (${error.message})`);
    continue;
  }

  const fileFailuresBefore = failures.length;

  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const lang = getAttribute(htmlTag, "lang");

  if (!lang) {
    addFailure(file, "у элемента html отсутствует непустой lang");
  }

  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();

  if (!title) {
    addFailure(file, "отсутствует непустой title");
  }

  const ids = new Map();

  for (const match of html.matchAll(/\bid\s*=\s*(["'])(.*?)\1/gi)) {
    const id = match[2].trim();

    if (!id) {
      addFailure(file, "найден пустой id");
      continue;
    }

    ids.set(id, (ids.get(id) ?? 0) + 1);
  }

  for (const [id, count] of ids) {
    if (count > 1) {
      addFailure(file, `повторяющийся id="${id}" (${count} раза)`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];

    if (!hasAttribute(tag, "alt")) {
      addFailure(file, `изображение без alt: ${tag.slice(0, 100)}`);
    }
  }

  for (const match of html.matchAll(/<button\b[^>]*>/gi)) {
    const tag = match[0];

    if (!getAttribute(tag, "type")) {
      addFailure(file, `кнопка без type: ${tag.slice(0, 100)}`);
    }
  }

  for (const match of html.matchAll(/<label\b[^>]*>/gi)) {
    const tag = match[0];
    const targetId = getAttribute(tag, "for");

    if (targetId && !ids.has(targetId)) {
      addFailure(file, `label for="${targetId}" ссылается на отсутствующий id`);
    }
  }

  const controlPattern = /<(input|textarea|select)\b[^>]*>/gi;

  for (const match of html.matchAll(controlPattern)) {
    const tag = match[0];
    const element = match[1].toLowerCase();
    const type = (getAttribute(tag, "type") ?? "").toLowerCase();

    if (element === "input" && type === "hidden") {
      continue;
    }

    const id = getAttribute(tag, "id");
    const ariaLabel = getAttribute(tag, "aria-label");
    const ariaLabelledby = getAttribute(tag, "aria-labelledby");
    const titleAttribute = getAttribute(tag, "title");
    const hasExplicitLabel = id
      ? new RegExp(`<label\\b[^>]*\\bfor\\s*=\\s*(["'])${id}\\1`, "i").test(html)
      : false;
    const hasWrappingLabel = isWrappedByLabel(html, match.index);

    if (
      !ariaLabel &&
      !ariaLabelledby &&
      !titleAttribute &&
      !hasExplicitLabel &&
      !hasWrappingLabel
    ) {
      addFailure(file, `${element} без доступного имени: ${tag.slice(0, 120)}`);
    }
  }

  for (const match of html.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/gi)) {
    const value = match[2].trim();

    if (value === "") {
      addFailure(file, 'найден пустой href=""');
    }

    if (value === "#") {
      addFailure(file, 'найден одиночный href="#"');
    }
  }

  if (failures.length === fileFailuresBefore) {
    console.log(`PASS ${file}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }

  console.error("HTML quality check failed");
  process.exit(1);
}

console.log("HTML quality check passed");
