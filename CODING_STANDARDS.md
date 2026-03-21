# Coding Standards

## Page Object Pattern

### Structure

- One class per page, placed in `src/pages/`.
- Class name must match the page it represents (e.g. `RegistrationPage`).
- Accept `Page` as a constructor argument.

### Methods

- **Navigation** – `goto()` handles routing to the page's URL.
- **Actions** – one method per user action (e.g. `fillEmail()`, `submitForm()`).
- **Composite actions** – combine individual steps into a higher-level method (e.g. `register()`).
- **Locators** – expose element locators as getter methods returning a `Locator` (e.g. `getSuccessMessage()`).

### Rules

| Rule                                                  | Reason                                                         |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| **No assertions inside Page Objects.**                | Keeps page objects reusable and free of test logic.            |
| **All assertions go in test files only.**             | Tests stay the single source of truth for expected behavior.   |
| **No test data hardcoded in page objects.**           | Pass data as method arguments so tests control the input.      |
| **Methods describe user intent, not implementation.** | Use names like `register()` rather than `clickSubmitButton()`. |

## Test Files

- Follow the **AAA** pattern: **Arrange**, **Act**, **Assert**.
- Place `expect()` calls only in the **Assert** section.
- Use descriptive test names that explain the scenario and expected outcome.
