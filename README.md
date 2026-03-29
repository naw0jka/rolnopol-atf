# rolnopol-atf

Automated test framework for the **Rolnopol** web application, built with [Playwright](https://playwright.dev/). It covers end-to-end and smoke tests for registration, login, farm management, marketplace trading, financial operations, and role-based access control.

---

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Links](#links)

---

## Project Description

`rolnopol-atf` is a Playwright-based automated test framework that validates the Rolnopol farming simulation game. Tests are organised around the **Page Object Model (POM)** pattern and follow the **Arrange / Act / Assert** structure described in [CODING_STANDARDS.md](./CODING_STANDARDS.md).

Key test areas (see full plan in [TEST_PLAN.md](./TEST_PLAN.md)):

- **Registration & Login** – valid/invalid inputs, authentication tokens, session management
- **Farm & Resource Management** – CRUD operations for fields, animals, and staff
- **Marketplace Trading** – creating, browsing, buying, and cancelling offers
- **Financial Operations** – balance checks, transfers, and insufficient-funds scenarios
- **Role-Based Access Control** – farmer, admin, and superadmin permission enforcement
- **System Health & API** – health endpoints and Swagger UI validation

---

## Installation

**Prerequisites:** [Node.js](https://nodejs.org/) (v18 or later) and npm.

```bash
# 1. Clone the repository
git clone https://github.com/naw0jka/rolnopol-atf.git
cd rolnopol-atf

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env to configure your BASE_URL and other sensitive data

# 4. Install Playwright browsers
npx playwright install
```

---

## Usage

Make sure the Rolnopol application is running on the URL specified in your `.env` file (default: `http://localhost:3000`) before executing tests.

### Run all tests

```bash
npm test
```

### Run only smoke tests

```bash
npx playwright test --grep @smoke
```

### Run a specific test file

```bash
npx playwright test tests/registration.spec.ts
```

### View the HTML report after a test run

```bash
npx playwright show-report
```

---

## Project Structure

```
rolnopol-atf/
├── .env.example       # Environment variables template
├── src/
│   ├── config/
│   │   └── env.config.ts       # Environment variable validation and export
│   ├── models/
│   │   └── User.ts             # User model and factory functions
│   ├── pages/          # Page Object classes (one per application page)
│   │   ├── BasePage.ts
│   │   ├── DocsPage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProfilePage.ts
│   │   ├── RegistrationPage.ts
│   │   ├── StaffFieldsMainPage.ts
│   │   └── SwaggerPage.ts
│   └── urls.ts         # Centralised URL constants
├── tests/              # Playwright test files
│   ├── auth/
│   │   └── auth.setup.ts       # Authentication setup (stores session state)
│   ├── smoke/
│   │   ├── login.spec.ts       # Login flow and logout tests
│   │   └── profile.spec.ts     # Profile page tests
│   ├── example.spec.ts
│   ├── registration.spec.ts
│   ├── registration-negative.spec.ts
│   └── staff-fields.spec.ts
├── CODING_STANDARDS.md # Coding conventions and POM rules
├── TEST_PLAN.md        # Full test plan and coverage matrix
└── playwright.config.ts
```

---

## Links

- [Playwright documentation](https://playwright.dev/docs/intro)
- [Playwright test configuration](https://playwright.dev/docs/test-configuration)
- [Playwright trace viewer](https://playwright.dev/docs/trace-viewer)
- [Coding standards](./CODING_STANDARDS.md)
- [Test plan](./TEST_PLAN.md)
- [Issue tracker](https://github.com/naw0jka/rolnopol-atf/issues)