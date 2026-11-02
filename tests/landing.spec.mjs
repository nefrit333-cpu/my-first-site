import { test, expect } from "@playwright/test";

test("Лендинг открывается и показывает форму", async ({ page }) => {
  await page.goto("/landing.html");

  await expect(page.locator("[data-landing-form]")).toBeVisible();

  await expect(page.locator('[data-form-field="name"]')).toBeVisible();

  await expect(page.locator('[data-form-field="email"]')).toBeVisible();

  await expect(page.locator('[data-form-field="message"]')).toBeVisible();
});

test("Пустая форма показывает ошибки", async ({ page }) => {
  await page.route("https://formspree.io/**", (route) => route.abort());

  await page.goto("/landing.html");

  await page.locator("[data-form-submit]").click();

  await expect(page.locator('[data-form-field="name"]')).toHaveAttribute("aria-invalid", "true");

  await expect(page.locator('[data-form-field="email"]')).toHaveAttribute("aria-invalid", "true");

  await expect(page.locator('[data-form-field="message"]')).toHaveAttribute("aria-invalid", "true");
});

test("Черновик восстанавливается после перезагрузки", async ({ page }) => {
  await page.goto("/landing.html");

  await page.locator('[data-form-field="name"]').fill("Иван Тестовый");

  await page.locator('[data-form-field="email"]').fill("test@example.com");

  await page
    .locator('[data-form-field="message"]')
    .fill("Хочу заказать учебный лендинг для бизнеса");

  await expect
    .poll(() =>
      page.evaluate(() => {
        const raw = sessionStorage.getItem("dmitriy-web-application-draft-v1");
        return raw ? JSON.parse(raw).fields.name : "";
      })
    )
    .toBe("Иван Тестовый");

  await page.reload();

  await expect(page.locator('[data-form-field="name"]')).toHaveValue("Иван Тестовый");

  await expect(page.locator('[data-form-field="email"]')).toHaveValue("test@example.com");

  await expect(page.locator('[data-form-field="message"]')).toHaveValue(
    "Хочу заказать учебный лендинг для бизнеса"
  );
});

test("Успешная отправка показывает подтверждение", async ({ page }) => {
  await page.route("https://formspree.io/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true })
    })
  );

  await page.goto("/landing.html");

  await page.locator('[data-form-field="name"]').fill("Иван Тестовый");

  await page.locator('[data-form-field="email"]').fill("test@example.com");

  await page
    .locator('[data-form-field="message"]')
    .fill("Хочу заказать учебный лендинг для бизнеса");

  await page.locator("[data-form-submit]").click();

  await expect(page.locator("[data-form-confirmation]")).toBeVisible();
});
