import { expect, test } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("has title", { tag: ["@system-health", "@smoke"] }, async ({ page }) => {
    // Arrange

    // Act
    await page.goto("/");

    // Assert
    await expect(page).toHaveTitle("Rolnopol");
  });

  const loginExpectedText = "Login";
  const registerExpectedText = "Create Account";

  test(
    "Login page loads and is visible",
    { tag: ["@reg-login-auth", "@smoke"] },
    async ({ page }) => {
      // Arrange

      // Act
      await page.goto("/login.html");

      // Assert
      await expect(page).toHaveURL("http://localhost:3000/login.html");
      await expect(page.locator("#loginForm")).toContainText(loginExpectedText);
    },
  );

  test(
    "Register page loads and is visible",
    { tag: ["@reg-login-registration", "@smoke"] },
    async ({ page }) => {
      // Arrange

      // Act
      await page.goto("/register.html");

      // Assert
      await expect(page).toHaveURL("http://localhost:3000/register.html");
      await expect(page.locator("#registerForm")).toContainText(
        registerExpectedText,
      );
    },
  );

  test(
    "Swagger page loads and is visible",
    { tag: ["@api-swagger", "@smoke"] },
    async ({ page }) => {
      // Arrange

      // Act
      await page.goto("/swagger.html");

      // Assert
      await expect(page).toHaveURL("http://localhost:3000/swagger.html");
      await expect(page.locator("#navbar-nav")).toContainText("API Explorer");
    },
  );

  test(
    "Docs page loads and is visible",
    { tag: ["@smoke"] },
    async ({ page }) => {
      // Arrange

      // Act
      await page.goto("/docs.html");

      // Assert
      await expect(page).toHaveURL("http://localhost:3000/docs.html");
      await expect(page.locator("#navbar-nav")).toContainText("Documentation");
    },
  );
});
