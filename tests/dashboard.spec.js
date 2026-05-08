const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const users = require('../data/users.json');

test.describe('Dashboard - OrangeHRM', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Validar dashboard y usuario logueado', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.validateLoggedUserVisible();
  });

  test('Validar multiples opciones del menu lateral', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.validateMultipleMenuOptions(users.menuOptions);
  });

  test('Buscar opcion del menu lateral', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.searchMenuOption('PIM');
    await dashboardPage.validateMenuOptionVisible('PIM');
  });
});