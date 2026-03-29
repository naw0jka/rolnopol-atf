import { expect, test } from "@playwright/test";
import { StaffFieldsMainPage } from "../src/pages/StaffFieldsMainPage";

test.use({ storageState: "playwright/.auth/user.json" });

test.describe("Staff & Fields Management", () => {
  test(
    "logged user can add a field and find it by name with the correct area",
    { tag: ["@farm-resource-crud", "@smoke"] },
    async ({ page }, testInfo) => {
      // Arrange
      const staffFieldsMainPage = new StaffFieldsMainPage(page);
      const fieldName = `Nawi Test Field ${Date.now()}-${testInfo.parallelIndex}`;
      const district = "powiat wejherowski";
      const areaHa = "10";

      // Act - Navigate to Staff & Fields Management
      await staffFieldsMainPage.goto();

      // Assert - Staff & Fields Management page is loaded
      await expect(page).toHaveURL(staffFieldsMainPage.url);
      await expect(staffFieldsMainPage.getPageHeading()).toBeVisible();

      // Act - Add field and search by name
      await staffFieldsMainPage.createField(fieldName, district, areaHa);
      await staffFieldsMainPage.searchFieldByName(fieldName);

      // Assert - Field name and area are displayed in search results
      const createdFieldItem = staffFieldsMainPage
        .getFieldListItemByName(fieldName)
        .first();

      await expect(createdFieldItem).toBeVisible();
      await expect.soft(createdFieldItem).toContainText(fieldName);
      await expect.soft(createdFieldItem).toContainText(`${areaHa} ha`);
    },
  );

  test(
    "logged user can add an animal group and find it by type in the list",
    { tag: ["@farm-resource-crud", "@smoke"] },
    async ({ page }) => {
      // Arrange
      const staffFieldsMainPage = new StaffFieldsMainPage(page);
      const animalType = "🐄 Cow";
      const animalAmount = "15";

      // Act - Navigate to Staff & Fields Management
      await staffFieldsMainPage.goto();

      // Assert - Staff & Fields Management page is loaded
      await expect(page).toHaveURL(staffFieldsMainPage.url);
      await expect(staffFieldsMainPage.getPageHeading()).toBeVisible();

      // Act - Add animal group and search by type
      await staffFieldsMainPage.createAnimal(animalType, animalAmount);
      await staffFieldsMainPage.searchAnimalByName("cow");

      // Assert - Animal type and amount are displayed in search results
      const createdAnimalItem = staffFieldsMainPage
        .getAnimalListItemByAmount("cow", animalAmount)
        .first();

      await expect(createdAnimalItem).toBeVisible();
      await expect.soft(createdAnimalItem).toContainText("cow");
      await expect.soft(createdAnimalItem).toContainText(animalAmount);
    },
  );
});
