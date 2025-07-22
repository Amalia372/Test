import { chromium, expect, test } from '@playwright/test';

test('Signup nou cu slowMo', async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 800 });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://automationexercise.com/');
  await page.getByRole('button', { name: 'Consent' }).click();
  await page.getByRole('link', { name: ' Signup / Login' }).click();

  await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Name' }).fill('emilia');

  await expect(page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')).toBeVisible();
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(`emilia_${Date.now()}@gmail.com`);

  await page.getByRole('button', { name: 'Signup' }).click();

  await page.getByRole('radio', { name: 'Mrs.' }).check();
  await page.getByRole('textbox', { name: 'Password *' }).fill('qwerty');
  await page.getByRole('textbox', { name: 'First name *' }).fill('emilia');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('emilia2');
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill('asfgvg');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('adfe');
  await page.getByRole('textbox', { name: 'State *' }).fill('asdf');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('sddfe');
  await page.locator('#zipcode').fill('12345');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('23456665');
  
  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();

  await browser.close();
});
