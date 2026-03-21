import { expect, test } from "@playwright/test";
import { RegistrationPage } from "../src/pages/RegistrationPage";

const negativeScenarios = [
  {
    scenario: "invalid email format (no @ symbol)",
    email: "notanemail",
    displayName: "",
    password: "Valid123",
    expectedError: "Please enter a valid email address",
  },
  {
    scenario: "password shorter than 3 characters",
    email: "neg-test@rolnopol.com",
    displayName: "",
    password: "pw",
    expectedError: "Password must be at least 3 characters",
  },
  {
    scenario: "display name shorter than 3 characters",
    email: "neg-test@rolnopol.com",
    displayName: "AB",
    password: "Valid123",
    expectedError: "Display name must be at least 3 characters",
  },
  {
    scenario: "display name with invalid characters",
    email: "neg-test@rolnopol.com",
    displayName: "test@user",
    password: "Valid123",
    expectedError:
      "Display name can only contain letters, numbers, spaces, hyphens, and underscores",
  },
];

test.describe("Registration - Negative Scenarios", () => {
  for (const {
    scenario,
    email,
    displayName,
    password,
    expectedError,
  } of negativeScenarios) {
    test(
      `registration is rejected when ${scenario}`,
      { tag: ["@reg-login-registration-negative"] },
      async ({ page }) => {
        // Arrange
        const registrationPage = new RegistrationPage(page);

        // Act
        await registrationPage.goto();
        await registrationPage.fillEmail(email);
        if (displayName) {
          await registrationPage.fillDisplayName(displayName);
        }
        await registrationPage.fillPassword(password);
        await registrationPage.submitForm();

        // Assert
        await expect(registrationPage.getFormError()).toContainText(
          expectedError,
        );
        await expect(page).toHaveURL(/\/register\.html$/);
      },
    );
  }
});
