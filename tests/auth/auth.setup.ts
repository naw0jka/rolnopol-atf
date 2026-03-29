import { test as setup } from "@playwright/test";
import { ENV } from "../../src/config/env.config";
import { LoginPage } from "../../src/pages/LoginPage";

const authFile = "playwright/.auth/user.json";

setup("authenticate as demo user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(ENV.DEMO_USER_EMAIL, ENV.DEMO_USER_PASSWORD);

  await page.waitForURL(/\/profile\.html$/);

  await page.context().storageState({ path: authFile });
});
