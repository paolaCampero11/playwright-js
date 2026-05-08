const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // Actualizar estos locators si cambia la pantalla de login
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.getByRole('alert');
    this.loginTitle = page.getByRole('heading', { name: /login/i });
  }

  async goToLogin() {
    await this.open('/web/index.php/auth/login');
  }

  async validateLoginPageLoaded() {
    await expect(this.loginTitle).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async clickLogin() {
    await this.click(this.loginButton);
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async validateErrorMessage(expectedMessage) {
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}

module.exports = LoginPage;