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
    this.employeTextBox = page.getByRole('textbox', {name: 'Type for hints...' });    
    this.createClaimButton = page.getByRole('button', {name: 'Create'});    
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

  async prepareNewClaimForm() {
    await this.assignClaimButton.waitFor({ state: 'visible' });
    await this.assignClaimButton.click();
  }

  async employeeSelection(employeeName) {
    await this.employeTextBox.click();
    await this.employeTextBox.fill(employeeName);
    await this.page.waitForTimeout(300);
    await this.page.locator('.oxd-autocomplete-option').first().click();
  }

  //Seleccionar al primer empleado
  async selectFirstEmployee() {
  
    const employeeInput = this.page.locator('.oxd-autocomplete-text-input input').first();
    
    await employeeInput.click();
    await employeeInput.fill('a');  
    await this.page.waitForTimeout(1500); 
    
    const dropdown = this.page.locator('.oxd-autocomplete-dropdown');
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });

    await this.page.waitForFunction(
      () => {
        const loadingMsg = document.querySelector('.oxd-autocomplete-option');
        return !loadingMsg || !loadingMsg.textContent.includes('Searching');
      },
      { timeout: 8000 }
    );

    const validOptions = dropdown.locator('.oxd-autocomplete-option:not(:has-text("Searching"))');
    await validOptions.first().waitFor({ state: 'visible', timeout: 8000 });
    
    const firstOption = validOptions.first();
    const optionText = await firstOption.textContent();

    await firstOption.click();
    
    await expect(employeeInput).not.toHaveValue('');
  }

  //Seleccionar una opcion del dropdown
  async selectFromLongDropdown(labelName, optionText) {
    const wrapper = this.page
      .locator('.oxd-input-group')
      .filter({ has: this.page.locator('.oxd-label', { hasText: labelName }) });
    
    await wrapper.locator('.oxd-select-text').click();
    
    const dropdownPanel = this.page.locator('.oxd-select-dropdown');
    await dropdownPanel.waitFor({ state: 'visible', timeout: 10000 });
    
    const searchInput = dropdownPanel.locator('input.oxd-select-dropdown-input, input[type="text"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill(optionText);
      await this.page.waitForTimeout(800); 
    } else {
      await dropdownPanel.locator('.oxd-select-option').first().waitFor({ state: 'visible' });
    }
    
    //Busqueda exacta
    const optionRegex = new RegExp(`^${optionText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
    const targetOption = dropdownPanel.locator('.oxd-select-option').filter({ hasText: optionRegex }).first();
    
    await targetOption.waitFor({ state: 'visible', timeout: 8000 });
    await targetOption.click();
    
    await expect(wrapper.locator('.oxd-select-text-input')).toHaveText(optionText);
  }

  //
  async createClaim() {
    await this.createClaimButton.click();
    await this.page.waitForTimeout(300); 
  }

  async claimCreatedSuccessfully() {
    //Validar URL con ID de claim
    await expect(this.page).toHaveURL(/\/claim\/assignClaim\/id\/\d+/);
    
    //Validar que los campos están deshabilitados
    const employeeField = this.page.locator('input[disabled]').first();
    await expect(employeeField).toBeVisible();
    
    const submitButton = this.page.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();
  }

}

module.exports = ClaimPage;