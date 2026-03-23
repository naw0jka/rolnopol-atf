import { defineConfig, devices } from "@playwright/test";
require('dotenv').config();

export default defineConfig({
  testDir: "./tests",
  timeout: 10 * 1000,

  fullyParallel: true,
  reporter: process.env.CI
    ? [["github"], ["html"]]
    : [["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
