const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const PimPage = require('../pages/PimPage');
const users = require('../data/users.json');

test.describe('PIM - OrangeHRM', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Acceder a la seccion PIM', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);

    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.openMenuOption('PIM');

    await pimPage.validatePimPageLoaded();
  });

  test('Validar elementos principales de la seccion PIM', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);

    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.openMenuOption('PIM');

    await pimPage.validatePimPageLoaded();
    await pimPage.validatePimMainElements();
  });
});