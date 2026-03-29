import { expect, test } from "@playwright/test";
import { getEmptyUser } from "../../src/models/User";
import { LoginPage } from "../../src/pages/LoginPage";
import { ProfilePage } from "../../src/pages/ProfilePage";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Profile Page", () => {
  test(
    "profile page displays user information and key sections after login",
    { tag: ["@reg-login-auth", "@smoke"] },
    async ({ page }) => {
      // Arrange
      const loginPage = new LoginPage(page);
      const profilePage = new ProfilePage(page);
      const user = getEmptyUser();

      // Act
      await loginPage.goto();
      await loginPage.login(user.email, user.password);

      // Assert - Redirected to profile page
      await expect(page).toHaveURL(profilePage.url);
      await profilePage.waitForProfileLoaded();

      // Assert - Profile header displays user info
      await expect.soft(profilePage.getProfileHeader()).toBeVisible();
      await expect.soft(profilePage.getEmailValue()).toHaveText(user.email);

      // Assert - Profile Information section with key fields
      await expect
        .soft(profilePage.getProfileInformationSection())
        .toBeVisible();
      await expect
        .soft(profilePage.getDisplayedName())
        .toHaveText(user.displayName);
      await expect.soft(profilePage.getUserId()).toHaveText(/^\d+$/);
      await expect
        .soft(profilePage.getLastLogin())
        .toHaveText(/\w+ \d{1,2}, \d{4}/);

      // Assert - Update Profile section
      await expect.soft(profilePage.getUpdateProfileSection()).toBeVisible();
      await expect.soft(profilePage.getSaveChangesButton()).toBeVisible();

      // Assert - Danger Zone section
      await expect.soft(profilePage.getDangerZoneSection()).toBeVisible();
      await expect.soft(profilePage.getDeleteAccountButton()).toBeVisible();
    },
  );

  test(
    "profile update form contains pre-filled display name and empty password fields",
    { tag: ["@reg-login-auth"] },
    async ({ page }) => {
      // Arrange
      const loginPage = new LoginPage(page);
      const profilePage = new ProfilePage(page);
      const user = getEmptyUser();

      // Act
      await loginPage.goto();
      await loginPage.login(user.email, user.password);
      await profilePage.waitForProfileLoaded();

      // Assert - Display Name input is pre-filled with current name
      await expect(profilePage.getNewDisplayedNameInput()).toHaveValue(
        user.displayName,
      );

      // Assert - Password fields are empty
      await expect.soft(profilePage.getNewPasswordInput()).toBeEmpty();
      await expect.soft(profilePage.getConfirmPasswordInput()).toBeEmpty();

      // Assert - Save Changes button is enabled
      await expect(profilePage.getSaveChangesButton()).toBeEnabled();
    },
  );
});
