import { expect, test } from "@playwright/test";
import { DocsPage } from "../src/pages/DocsPage";
import { HomePage } from "../src/pages/HomePage";
import { LoginPage } from "../src/pages/LoginPage";
import { RegistrationPage } from "../src/pages/RegistrationPage";
import { SwaggerPage } from "../src/pages/SwaggerPage";

test.describe("Smoke tests", () => {
  test("has title", { tag: ["@system-health", "@smoke"] }, async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);

    // Act
    await homePage.goto();

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
      const loginPage = new LoginPage(page);

      // Act
      await loginPage.goto();

      // Assert
      await expect(page).toHaveURL("http://localhost:3000/login.html");
      await expect(loginPage.getLoginForm()).toContainText(loginExpectedText);
    },
  );

  test(
    "Register page loads and is visible",
    { tag: ["@reg-login-registration", "@smoke"] },
    async ({ page }) => {
      // Arrange
      const registrationPage = new RegistrationPage(page);

      // Act
      await registrationPage.goto();

      // Assert
      await expect(page).toHaveURL("http://localhost:3000/register.html");
      await expect(registrationPage.getRegisterForm()).toContainText(
        registerExpectedText,
      );
    },
  );

  test(
    "Swagger page loads and is visible",
    { tag: ["@api-swagger", "@smoke"] },
    async ({ page }) => {
      // Arrange
      const swaggerPage = new SwaggerPage(page);

      // Act
      await swaggerPage.goto();

      // Assert
      await expect(page).toHaveURL("http://localhost:3000/swagger.html");
      await expect(swaggerPage.getNavbar()).toContainText("API Explorer");
    },
  );

  test(
    "Docs page loads and is visible",
    { tag: ["@smoke"] },
    async ({ page }) => {
      // Arrange
      const docsPage = new DocsPage(page);

      // Act
      await docsPage.goto();

      // Assert
      await expect(page).toHaveURL("http://localhost:3000/docs.html");
      await expect(docsPage.getNavbar()).toContainText("Documentation");
    },
  );
});
