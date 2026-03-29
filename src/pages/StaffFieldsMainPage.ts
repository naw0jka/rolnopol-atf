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
}
