import { Locator } from "@playwright/test";
import { Urls } from "../urls";
import { BasePage } from "./BasePage";

export class StaffFieldsMainPage extends BasePage {
  readonly url = Urls.staffFieldsMain;

  getPageHeading() {
    return this.page.getByRole("heading", {
      name: "Staff & Fields Management",
      level: 1,
    });
  }

  getStaffFieldsNavigationIcon() {
    return this.page.getByTestId("nav-staff-fields");
  }

  getFieldsSearchInput() {
    return this.page.getByPlaceholder("Search fields...");
  }

  getFieldsSection() {
    return this.page
      .locator("div")
      .filter({ has: this.getFieldsSearchInput() })
      .first();
  }

  getAddFieldButton() {
    return this.getFieldsSection().getByRole("button", { name: /Add Field/i });
  }

  getFieldNameInput() {
    return this.page.getByLabel("Field Name");
  }

  getDistrictSelect() {
    return this.page.getByLabel("District (optional)");
  }

  getFieldAreaInput() {
    return this.page.getByLabel("Area (ha)");
  }

  getAddFieldSubmitButton() {
    return this.page
      .locator("form")
      .filter({ has: this.getFieldNameInput() })
      .locator('button[type="submit"]');
  }

  async openStaffFieldsManagementFromNavigation() {
    await this.getStaffFieldsNavigationIcon().click();
  }

  async openAddFieldModal() {
    await this.getAddFieldButton().click();
  }

  async fillFieldName(name: string) {
    await this.getFieldNameInput().fill(name);
  }

  async selectDistrict(district: string) {
    await this.getDistrictSelect().selectOption({ label: district });
  }

  async fillFieldArea(area: string | number) {
    await this.getFieldAreaInput().fill(String(area));
  }

  async submitAddField() {
    await this.getAddFieldSubmitButton().click();
  }

  async createField(name: string, district: string, area: string | number) {
    await this.openAddFieldModal();
    await this.getFieldNameInput().waitFor({ state: "visible" });
    await this.fillFieldName(name);
    await this.selectDistrict(district);
    await this.fillFieldArea(area);
    await this.submitAddField();
  }

  async searchFieldByName(name: string) {
    await this.getFieldsSearchInput().fill(name);
  }

  getFieldListItems(): Locator {
    return this.getFieldsSection().locator("li");
  }

  getFieldListItemByName(name: string): Locator {
    return this.getFieldListItems().filter({ hasText: name });
  }

  // --- Animals section ---

  getAnimalsSearchInput() {
    return this.page.getByPlaceholder("Search animals...");
  }

  getAnimalsSection() {
    return this.page
      .locator("div")
      .filter({ has: this.getAnimalsSearchInput() })
      .last();
  }

  getAddAnimalButton() {
    return this.page.getByRole("button", { name: "+ Add Animal" });
  }

  getAnimalTypeSelect() {
    return this.page.getByRole("combobox", { name: /Type/i });
  }

  getAnimalAmountInput() {
    return this.page.getByRole("spinbutton", { name: /Amount/i });
  }

  getAnimalFieldSelect() {
    return this.page.getByRole("combobox", { name: /Field/i });
  }

  getAddAnimalSubmitButton() {
    return this.page
      .locator("div")
      .filter({ has: this.getAnimalAmountInput() })
      .getByRole("button", { name: /Add Animal/i });
  }

  async openAddAnimalModal() {
    await this.getAddAnimalButton().click();
  }

  async selectAnimalType(type: string) {
    await this.getAnimalTypeSelect().selectOption({ label: type });
  }

  async fillAnimalAmount(amount: string | number) {
    await this.getAnimalAmountInput().fill(String(amount));
  }

  async submitAddAnimal() {
    await this.getAddAnimalSubmitButton().click();
  }

  async createAnimal(type: string, amount: string | number) {
    await this.openAddAnimalModal();
    await this.getAnimalTypeSelect().waitFor({ state: "visible" });
    await this.selectAnimalType(type);
    await this.fillAnimalAmount(amount);
    await this.submitAddAnimal();
    await this.getAnimalTypeSelect().waitFor({ state: "hidden" });
  }

  async searchAnimalByName(name: string) {
    await this.getAnimalsSearchInput().fill(name);
  }

  getAnimalListItems(): Locator {
    return this.page.locator('li:has([title="Animal"])');
  }

  getAnimalListItemByName(name: string): Locator {
    return this.getAnimalListItems().filter({ hasText: name });
  }

  getAnimalListItemByAmount(type: string, amount: string | number): Locator {
    return this.getAnimalListItems().filter({
      has: this.page.locator(`[title="Amount of ${type}: ${amount}"]`),
    });
  }
}
