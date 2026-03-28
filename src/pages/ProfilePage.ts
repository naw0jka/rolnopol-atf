import { Urls } from "../urls";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
  readonly url = Urls.profile;

  getProfileInformationSection() {
    return this.page.getByRole("heading", {
      name: "Profile Information",
      level: 3,
    });
  }

  getUpdateProfileSection() {
    return this.page.getByRole("heading", {
      name: "Update Profile",
      level: 3,
    });
  }

  getDangerZoneSection() {
    return this.page.getByRole("heading", {
      name: "Danger Zone",
      level: 3,
    });
  }

  getDisplayedName() {
    return this.page.getByTestId("displayed-name");
  }

  getEmailValue() {
    return this.page.getByTestId("email-value");
  }

  getUserId() {
    return this.page.getByTestId("user-id");
  }

  getLastLogin() {
    return this.page.getByTestId("last-login");
  }

  getProfileHeader() {
    return this.page.getByTestId("profile-header");
  }

  getProfileContent() {
    return this.page.getByTestId("profile-content");
  }

  async waitForProfileLoaded() {
    await this.page.waitForURL(this.url);
    await this.getProfileContent().waitFor({ state: "attached" });
    await this.page
      .getByTestId("displayed-name")
      .filter({ hasNotText: "-" })
      .waitFor({ state: "visible" });
  }

  getNewDisplayedNameInput() {
    return this.page.getByTestId("new-displayed-name-input");
  }

  getNewPasswordInput() {
    return this.page.getByTestId("new-password-input");
  }

  getConfirmPasswordInput() {
    return this.page.getByTestId("confirm-password-input");
  }

  getSaveChangesButton() {
    return this.page.getByTestId("update-profile-submit-btn");
  }

  getDeleteAccountButton() {
    return this.page.getByTestId("delete-account-btn");
  }

  async logout() {
    await this.page
      .getByTestId("header-component")
      .getByTestId("logout-btn")
      .click();
  }
}
