import { expect, test } from "@playwright/test";

test("has title", { tag: ["@system-health", "@smoke"] }, async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Rolnopol");
});

test.describe('Smoke tests', () => {
  test('Login page loads and is visible', async ({ page }) => {
    await page.goto('/login.html');
    await expect(page).toHaveURL('http://localhost:3000/login.html');
    await expect(page.locator('body')).toBeVisible();
  });

  test('Register page loads and is visible', async ({ page }) => {
    await page.goto('/register.html');
    await expect(page).toHaveURL('http://localhost:3000/register.html');
    await expect(page.locator('body')).toBeVisible();
  });
});

