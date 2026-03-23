import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { ProfilePage } from "../src/pages/ProfilePage";
import { HomePage } from "../src/pages/HomePage";

test.describe("Login", () => {
  test(
    "successful login shows profile sections and logout redirects to home",
    { tag: ["@reg-login-auth", "@reg-login-logout", "@smoke"] },
    async ({ page }) => {
      // Arrange
      const loginPage = new LoginPage(page);
      const profilePage = new ProfilePage(page);
      const homePage = new HomePage(page);
      const email = "emptyuser@rolnopol.demo.pl";
      const password = "demoPass123";

      // Act - Login
      await loginPage.goto();
      await loginPage.login(email, password);

      // Assert - Redirected to profile page
      await expect.soft(page).toHaveURL(profilePage.url);

      // Assert - Profile sections are visible
      await expect.soft(profilePage.getProfileInformationSection()).toBeVisible();
      await expect.soft(profilePage.getUpdateProfileSection()).toBeVisible();
      await expect.soft(profilePage.getDangerZoneSection()).toBeVisible();

      // Act - Logout
      await profilePage.logout();

      // Assert - Redirected to home page
      await expect(page).toHaveURL(homePage.url);
    },
  );
});
