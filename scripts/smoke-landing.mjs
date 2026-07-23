import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();

const checks = [
  {
    file: "landing.html",
    markers: [
      ["форма заявки", "data-landing-form"],
      ["Formspree action", 'action="https://formspree.io/f/'],
      ["method POST", 'method="POST"'],
      ["поле name", 'name="name"'],
      ["поле email", 'name="email"'],
      ["поле message", 'name="message"'],
      ["honeypot", 'name="contact_trap"'],
      ["статус отправки", "data-form-status"],
      ["кнопка повтора", "data-form-retry"],
      ["карточка подтверждения", "data-form-confirmation"],
      ["кнопка новой заявки", "data-confirmation-new"],
      ["кнопка возврата к брифу", "data-confirmation-brief-action"],
      ["блок черновика заявки", "data-application-draft"],
      ["статус черновика", "data-application-draft-status"],
      ["кнопка очистки черновика", "data-application-draft-clear"],
      ["текст кнопки повтора", "Повторить отправку"],
      ["текст новой заявки", "Отправить ещё одну заявку"],
      ["текст очистки черновика", "Очистить черновик заявки"],
      ["selected_plan", 'name="selected_plan"'],
      ["selected_extras", 'name="selected_extras"'],
      ["estimated_price", 'name="estimated_price"'],
      ["reference_source", 'name="reference_source"'],
      ["reference_project", 'name="reference_project"'],
      ["reference_type", 'name="reference_type"'],
      ["reference_result", 'name="reference_result"'],
      ["brief_site_type", 'name="brief_site_type"'],
      ["brief_goal", 'name="brief_goal"'],
      ["brief_features", 'name="brief_features"'],
      ["brief_timeline", 'name="brief_timeline"'],
      ["brief_budget", 'name="brief_budget"'],
      ["brief_status", 'name="brief_status"']
    ]
  },
  {
    file: "landing.js",
    markers: [
      ["fetch", "fetch("],
      ["FormData", "new FormData"],
      ["AbortController", "new AbortController"],
      ["isSubmitting", "isSubmitting"],
      ["setFormState", "setFormState"],
      ["sessionStorage", "sessionStorage"],
      ["localStorage", "localStorage"],
      ["ключ черновика брифа", "dmitriy-web-project-brief-v1"],
      ["ключ черновика заявки", "dmitriy-web-application-draft-v1"],
      ["idle", '"idle"'],
      ["validating", '"validating"'],
      ["sending", '"sending"'],
      ["success", '"success"'],
      ["error", '"error"'],
      ["кнопка повтора в логике", "data-form-retry"],
      ["кнопка новой заявки в логике", "data-confirmation-new"],
      ["кнопка очистки черновика в логике", "data-application-draft-clear"]
    ]
  },
  {
    file: "landing.css",
    markers: [
      ["статус отправки", "landing-form__status"],
      ["кнопка повтора", "landing-form__retry"],
      ["карточка подтверждения", "landing-form-confirmation"],
      ["блок черновика заявки", "landing-form-draft"],
      ["кнопка очистки черновика", "landing-form-draft__clear"],
      ["focus-visible", "focus-visible"],
      ["prefers-reduced-motion", "prefers-reduced-motion"],
      ["mobile media query", "@media"]
    ]
  }
];

const readFile = (relativePath) => {
  const absolutePath = path.join(projectRoot, relativePath);

  return fs.readFileSync(absolutePath, "utf8");
};

let hasFailure = false;

for (const group of checks) {
  let content = "";

  try {
    content = readFile(group.file);
  } catch (error) {
    hasFailure = true;
    console.error(`FAIL ${group.file}: файл не прочитан (${error.message})`);
    continue;
  }

  const missingMarkers = group.markers.filter(([, marker]) => !content.includes(marker));

  if (missingMarkers.length > 0) {
    hasFailure = true;

    for (const [label, marker] of missingMarkers) {
      console.error(`FAIL ${group.file}: не найден ${marker} (${label})`);
    }

    continue;
  }

  console.log(`PASS ${group.file}`);
}

if (hasFailure) {
  console.error("Smoke check failed");
  process.exit(1);
}

console.log("Smoke check passed");
