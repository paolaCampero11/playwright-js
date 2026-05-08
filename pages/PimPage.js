const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class PimPage extends BasePage {
  constructor(page) {
    super(page);

    this.pimTitle = page.locator('h6');
    this.employeeNameLabel = page.getByText('Employee Name', { exact: true });
    this.employeeIdLabel = page.getByText('Employee Id', { exact: true });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
  }

  async validatePimPageLoaded() {
    await expect(this.page).toHaveURL(/pim/);
    await expect(this.pimTitle).toHaveText('PIM');
  }

  async validatePimMainElements() {
    await expect(this.employeeNameLabel).toBeVisible();
    await expect(this.employeeIdLabel).toBeVisible();
    await expect(this.searchButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
  }
}

module.exports = PimPage;