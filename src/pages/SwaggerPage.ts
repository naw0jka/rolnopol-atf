import { Urls } from "../urls";
import { BasePage } from "./BasePage";

export class SwaggerPage extends BasePage {
  protected readonly url = Urls.swagger;

  getNavbar() {
    return this.page.locator("#navbar-nav");
  }
}
