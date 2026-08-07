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

const getTags = (html, tagName) => html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];

const getMetaByAttribute = (html, attributeName, attributeValue) =>
  getTags(html, "meta").filter((tag) => {
    const value = getAttribute(tag, attributeName);
    return value?.toLowerCase() === attributeValue.toLowerCase();
  });

const checkSingleMeta = (file, html, attributeName, attributeValue) => {
  const matches = getMetaByAttribute(html, attributeName, attributeValue);

  if (matches.length === 0) {
    addFailure(file, `отсутствует meta ${attributeName}="${attributeValue}"`);
    return;
  }

  if (matches.length > 1) {
    addFailure(file, `дублируется meta ${attributeName}="${attributeValue}"`);
  }

  const content = getAttribute(matches[0], "content");

  if (!content) {
    addFailure(file, `meta ${attributeName}="${attributeValue}" без непустого content`);
  }
};

const checkCanonical = (file, html) => {
  const canonicalLinks = getTags(html, "link").filter((tag) => {
    const rel = getAttribute(tag, "rel");
    return rel?.toLowerCase() === "canonical";
  });

  if (canonicalLinks.length === 0) {
    addFailure(file, 'отсутствует link rel="canonical"');
    return;
  }

  if (canonicalLinks.length > 1) {
    addFailure(file, 'дублируется link rel="canonical"');
  }

  const href = getAttribute(canonicalLinks[0], "href");

  if (!href) {
    addFailure(file, 'link rel="canonical" без непустого href');
  }
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
  const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];

  if (titleMatches.length === 0) {
    addFailure(file, "отсутствует title");
  } else {
    if (titleMatches.length > 1) {
      addFailure(file, "дублируется title");
    }

    const title = titleMatches[0][1].trim();

    if (!title) {
      addFailure(file, "title пустой");
    }

    if (title.length > 70) {
      addFailure(file, `title длиннее 70 символов (${title.length})`);
    }
  }

  checkSingleMeta(file, html, "name", "description");
  checkSingleMeta(file, html, "name", "viewport");
  checkCanonical(file, html);
  checkSingleMeta(file, html, "property", "og:title");
  checkSingleMeta(file, html, "property", "og:description");
  checkSingleMeta(file, html, "property", "og:type");
  checkSingleMeta(file, html, "property", "og:url");
  checkSingleMeta(file, html, "name", "twitter:card");

  if (failures.length === fileFailuresBefore) {
    console.log(`PASS ${file}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }

  console.error("SEO meta check failed");
  process.exit(1);
}

console.log("SEO meta check passed");
