## Rolnopol Application Test Plan

### 1. Registration & Login

- Test user registration with valid and invalid data. <!-- @reg-login-registration @smoke -->
- Test login with correct and incorrect credentials. <!-- @reg-login-auth @smoke -->
- Verify authentication token and session cookies. <!-- @reg-login-token -->
- Test logout and session invalidation. <!-- @reg-login-logout @smoke -->
- Check rate limiting on login attempts. <!-- @reg-login-rate-limit -->

### 2. Farm & Resource Management

- Add, edit, and remove fields, animals, and staff. <!-- @farm-resource-crud @smoke -->
- Assign staff and animals to fields. <!-- @farm-resource-assign -->
- Verify that assigned resources cannot be sold. <!-- @farm-resource-assigned-block -->

### 3. Marketplace Trading

- Create marketplace offers for fields and animals. <!-- @marketplace-create-offer @smoke -->
- Browse and filter marketplace offers. <!-- @marketplace-browse-filter -->
- Buy available offers as another user. <!-- @marketplace-buy-offer @smoke -->
- Attempt to buy with insufficient funds. <!-- @marketplace-buy-insufficient -->
- Cancel offers and check offer statuses. <!-- @marketplace-cancel-offer -->

### 4. Financial Operations

- Check account balance and transaction history. <!-- @finance-balance-history @smoke -->
- Verify balance updates after purchases and sales. <!-- @finance-balance-update @smoke -->
- Transfer funds between users. <!-- @finance-transfer -->
- Attempt transactions with insufficient funds. <!-- @finance-insufficient -->

### 5. Role-Based Access Control

- Test permissions for farmer, admin, and superadmin. <!-- @rbac-permissions @smoke -->
- Ensure farmers cannot access admin/superadmin features. <!-- @rbac-access-block -->

### 6. System Health & API

- Access system health and database status endpoints. <!-- @system-health @smoke -->
- Test API endpoints via Swagger UI. <!-- @api-swagger -->

### 7. End-to-End Scenarios

- Register and set up a farm. <!-- @e2e-register-setup-farm -->
- Sell a field on the marketplace and verify ownership transfer. <!-- @e2e-sell-field -->
- Attempt to buy with insufficient funds and check error handling. <!-- @e2e-buy-insufficient -->

---

This plan covers the main features, user flows, and edge cases described in the documentation.
