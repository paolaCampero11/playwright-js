const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const users = require('../data/users.json');

test.describe('Login - OrangeHRM', () => {
  test('Login exitoso con usuario valido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goToLogin();
    await loginPage.validateLoginPageLoaded();
    await loginPage.login(users.validUser.username, users.validUser.password);

    await dashboardPage.validateDashboardLoaded();
  });

  for (const invalidUser of users.invalidUsers) {
    test(`Login invalido con usuario ${invalidUser.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goToLogin();
      await loginPage.validateLoginPageLoaded();
      await loginPage.login(invalidUser.username, invalidUser.password);

      await loginPage.validateErrorMessage(invalidUser.message);
    });
  }
});