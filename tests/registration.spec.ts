import { expect, test } from "@playwright/test";
import { RegistrationPage } from "../src/pages/RegistrationPage";

test.describe("Registration", () => {
  test(
    "successful registration with valid data redirects to login page",
    { tag: ["@reg-login-registration", "@smoke"] },
    async ({ page }) => {
      // Arrange
      const registrationPage = new RegistrationPage(page);
      const email = `testuser+${Date.now()}@rolnopol.com`;
      const displayName = "Test User";
      const password = "Test123";

      // Act
      await registrationPage.goto();
      await registrationPage.register(email, displayName, password);

      // Assert
      await expect(registrationPage.getSuccessMessage()).toBeVisible();
      await expect(page).toHaveURL(/\/login\.html$/);
    },
  );
});
