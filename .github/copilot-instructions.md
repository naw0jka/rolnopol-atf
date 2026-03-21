## Playwright Test Framework

This project uses the Playwright Test framework for end-to-end and smoke testing.

When creating or updating tests, always review the configuration in [playwright.config.ts](playwright.config.ts) to ensure tests are compatible with the current settings (such as baseURL, timeout, browser projects, and other options).

## Test Structure

Use the AAA (Arrange, Act, Assert) pattern as the standard for writing tests:

- **Arrange**: Set up the test environment, initialize data, and prepare any necessary preconditions.
- **Act**: Perform the action or operation being tested.
- **Assert**: Verify that the expected outcome has occurred and check the results.
