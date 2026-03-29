import { expect, test } from "@playwright/test";
import { getDemoUser, getEmptyUser } from "../../src/models/User";
import { HomePage } from "../../src/pages/HomePage";
import { LoginPage } from "../../src/pages/LoginPage";
import { ProfilePage } from "../../src/pages/ProfilePage";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login", () => {
  const usersForLoginTest = [
    { type: "empty user", user: getEmptyUser() },
    { type: "demo user", user: getDemoUser() },
  ];

  for (const { type, user } of usersForLoginTest) {
    test(
      `successful login as ${type} shows profile sections and logout redirects to home`,
      { tag: ["@reg-login-auth", "@reg-login-logout", "@smoke"] },
      async ({ page }) => {
        // Arrange
        const loginPage = new LoginPage(page);
        const profilePage = new ProfilePage(page);
        const homePage = new HomePage(page);

        // Act - Login
        await loginPage.goto();
        await loginPage.login(user.email, user.password);

        // Assert - Redirected to profile page
        await expect.soft(page).toHaveURL(profilePage.url);
        await profilePage.waitForProfileLoaded();

        // Assert - Profile sections are visible
        await expect
          .soft(profilePage.getProfileInformationSection())
          .toBeVisible();
        await expect.soft(profilePage.getUpdateProfileSection()).toBeVisible();
        await expect.soft(profilePage.getDangerZoneSection()).toBeVisible();

        // Act - Logout
        await profilePage.logout();

        // Assert - Redirected to home page
        await expect(page).toHaveURL(homePage.url);
      },
    );
  }
});
