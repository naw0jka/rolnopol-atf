import { Urls } from "../urls";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly url = Urls.login;

  async fillEmail(email: string) {
    await this.page.getByTestId("email-input").fill(email);
  }

  async fillPassword(password: string) {
    await this.page.getByTestId("password-input").fill(password);
  }

  async submitForm() {
    await this.page.getByTestId("login-submit-btn").click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submitForm();
  }

  getLoginForm() {
    return this.page.locator("#loginForm");
  }
}
