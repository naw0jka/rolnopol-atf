import { Page } from "@playwright/test";

export class RegistrationPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/register.html");
  }

  async fillEmail(email: string) {
    await this.page.getByTestId("email-input").fill(email);
  }

  async fillDisplayName(displayName: string) {
    await this.page.getByTestId("display-name-input").fill(displayName);
  }

  async fillPassword(password: string) {
    await this.page.getByTestId("password-input").fill(password);
  }

  async submitForm() {
    await this.page.getByRole("button", { name: "Create Account" }).click();
  }

  async register(email: string, displayName: string, password: string) {
    await this.fillEmail(email);
    await this.fillDisplayName(displayName);
    await this.fillPassword(password);
    await this.submitForm();
  }

  getSuccessMessage() {
    return this.page.getByText("Registration successful!");
  }
}
