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

  async logout() {
    await this.page
      .getByTestId("header-component")
      .getByTestId("logout-btn")
      .click();
  }
}
