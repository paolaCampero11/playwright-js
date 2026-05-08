const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class ClaimPage extends BasePage {
  constructor(page) {
    super(page);

    this.claimTitle = page.locator('h6');
    this.employeeNameLabel = page.getByText('Employee Name', { exact: true });
    this.referenceIdLabel = page.getByText('Reference Id', { exact: true });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.assignClaimButton = page.getByRole('button', { name: 'Assign Claim' });
  }

  async validateClaimPageLoaded() {
    await expect(this.page).toHaveURL(/claim/);
    await expect(this.claimTitle).toHaveText('Claim');
  }

  async validateClaimMainElements() {
    await expect(this.employeeNameLabel).toBeVisible();
    await expect(this.referenceIdLabel).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
    await expect(this.assignClaimButton).toBeVisible();  
  }
}

module.exports = ClaimPage;