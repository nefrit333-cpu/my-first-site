import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry"
  },
  webServer: {
    command: "npx http-server . -p 4173 -a 127.0.0.1 -c-1",
    url: "http://127.0.0.1:4173/landing.html",
    reuseExistingServer: !process.env.CI,
    timeout: 30000
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium"
      }
    }
  ]
});
