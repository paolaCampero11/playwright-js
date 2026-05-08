const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.dashboardTitle = page.locator('h6');
    this.userDropdownName = page.locator('.oxd-userdropdown-name');
    this.menuItems = page.locator('.oxd-main-menu-item');
    this.searchInput = page.locator('input[placeholder="Search"]');
  }

  async validateDashboardLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.dashboardTitle).toHaveText('Dashboard');
    await expect(this.userDropdownName).toBeVisible();
  }

  async validateMenuOptionVisible(optionName) {
    await expect(this.page.getByRole('link', { name: optionName })).toBeVisible();
  }

  async validateMultipleMenuOptions(options) {
    await this.menuItems.first().waitFor();

    for (const option of options) {
      await this.validateMenuOptionVisible(option);
    }
  }

  async searchMenuOption(optionName) {
    await this.fill(this.searchInput, optionName);
  }

  async openMenuOption(optionName) {
    await this.page.getByRole('link', { name: optionName }).click();
  }

  async validateLoggedUserVisible() {
    await expect(this.userDropdownName).toBeVisible();
  }
}

module.exports = DashboardPage;