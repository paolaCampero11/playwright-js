const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const ClaimPage = require('../pages/ClaimPage');
const users = require('../data/users.json');

test.describe('Claim - OrangeHRM', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Acceder a la seccion Claim', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const claimPage = new ClaimPage(page);

    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.openMenuOption('Claim');

    await claimPage.validateClaimPageLoaded();
  });

  test('Validar elementos principales de la seccion Claim', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const claimPage = new ClaimPage(page);

    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.openMenuOption('Claim');

    await claimPage.validateClaimPageLoaded();
    await claimPage.validateClaimMainElements();
  });
});