import { test, expect } from '@playwright/test';

// Adăugăm slowMo (500 ms delay între acțiuni)
test.use({ launchOptions: { slowMo: 500 } });

test('OrangeHRM login and about check', async ({ page }) => {
  // Navigăm la pagina de login
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Introducem username
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

  // Introducem parola
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

  // Verificăm butonul și facem login
  await expect(page.getByRole('button')).toContainText('Login');
  await page.getByRole('button', { name: 'Login' }).click();

  // Navigăm la About
  await page.getByText('manda nicknameTest').click();
  await page.getByRole('menuitem', { name: 'About' }).click();

  // Verificăm informațiile din fereastra About
  await expect(page.getByText('Company Name:')).toBeVisible();
  await expect(page.getByText('Version:')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('OrangeHRM OS');

  // Închidem fereastra
  await page.getByRole('button', { name: '×' }).click();

  // Logout
  await page.getByText('manda nicknameTest').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});
