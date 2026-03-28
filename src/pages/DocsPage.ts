import { Urls } from "../urls";
import { BasePage } from "./BasePage";

export class DocsPage extends BasePage {
  readonly url = Urls.docs;

  getNavbar() {
    return this.page.locator("#navbar-nav");
  }
}
