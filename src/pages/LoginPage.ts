import { Urls } from "../urls";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  protected readonly url = Urls.login;

  getLoginForm() {
    return this.page.locator("#loginForm");
  }
}
