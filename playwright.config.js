const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  retries: 0,
  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright']
  ],
  use: {
     // Modificar esta URL si se quiere adaptar el framework a otra página
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    channel: 'chrome',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  }
});