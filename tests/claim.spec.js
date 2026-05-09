const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const ClaimPage = require('../pages/ClaimPage');
const users = require('../data/users.json');
const employes = require('../data/employes.json');

test.describe('Claim - OrangeHRM', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLogin();
    await loginPage.login(users.validUser.username, users.validUser.password);
  });

  test('Validar que un usuario pueda asignar un claim correctamente', async ({ page }) => {
    // --------ARRANGE------
    const dashboardPage = new DashboardPage(page);
    const claimPage = new ClaimPage(page);

    await dashboardPage.validateDashboardLoaded();
    await dashboardPage.openMenuOption('Claim');

    await claimPage.validateClaimPageLoaded();
    await claimPage.prepareNewClaimForm();
    await claimPage.selectFirstEmployee();
    await claimPage.selectFromLongDropdown('Event', 'Accommodation');
    await claimPage.selectFromLongDropdown('Currency','Argentine Peso' );

    // ----------ACT--------
    await claimPage.createClaim();

    // ----------ASSERT------
    await claimPage.claimCreatedSuccessfully();
  });

  test('Validar que no se pueda crear claim sin empleado', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const claimPage = new ClaimPage(page);
    
    // ----ARRANGE---
    await dashboardPage.openMenuOption('Claim');
      
    // -----ACT----
    await claimPage.prepareNewClaimForm();
    // NO seleccionar empleado
    await claimPage.selectFromLongDropdown('Event', 'Accommodation');
    await claimPage.selectFromLongDropdown('Currency','Argentine Peso' );
    await claimPage.createClaim(); // Intentar crear
    
    // -----ASSERT---
    const errorMessage = page.locator('.oxd-input-field-error-message', { hasText: 'Required' });
    await expect(errorMessage).toBeVisible();
    await expect(page).not.toHaveURL(/\/id\/\d+/);
  });

  test('Validar mensaje cuando no se encuentra empleado', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const claimPage = new ClaimPage(page);
    
    // ----ARRANGE---
    await dashboardPage.openMenuOption('Claim');
      
    // -----ACT----
    await claimPage.prepareNewClaimForm();
    await claimPage.employeeSelection(employes.employeInvalid.name);
    await claimPage.selectFromLongDropdown('Event', 'Accommodation');
    await claimPage.selectFromLongDropdown('Currency','Argentine Peso' );
    await claimPage.createClaim(); // Intentar crear
    
    // -----ASSERT---
    const errorMessage = page.locator('.oxd-input-field-error-message', { hasText: 'Invalid' });
    await expect(errorMessage).toBeVisible();
    await expect(page).not.toHaveURL(/\/id\/\d+/);
  });

  test('Validar que Cancel en el form de claim redirige a la seccion Employee Claims', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const claimPage = new ClaimPage(page);
    
    // ----ARRANGE---
    await dashboardPage.openMenuOption('Claim');
      
    // -----ACT----
    await claimPage.prepareNewClaimForm();
    await page.getByRole('button', { name: 'Cancel' }).click();
    
    // -----ASSERT---
    await expect(page.getByRole('button', { name: 'Assign Claim' })).toBeVisible();
  });

});