import { defineConfig, devices } from "@playwright/test";
import { ENV } from "./src/config/env.config";

export default defineConfig({
  testDir: "./tests",
  timeout: 15 * 1000,

  fullyParallel: true,
  reporter: process.env.CI
    ? [["github"], ["html"]]
    : [["html", { open: "never" }]],
  use: {
    baseURL: ENV.BASE_URL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "setup",
      testDir: "./tests/auth",
      testMatch: "auth.setup.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "authenticated-tests",
      testDir: "./tests",
      testMatch: "staff-fields.spec.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
    },
    {
      name: "smoke-tests",
      testDir: "./tests",
      testIgnore: ["auth/**", "staff-fields.spec.ts"],
      dependencies: ["authenticated-tests"],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "demo-user-tests",
      testDir: "./tests/auth",
      testIgnore: "auth.setup.ts",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
    },
  ],
});
