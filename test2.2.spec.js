import { test, expect, chromium } from '@playwright/test';

test('test', async () => {
  // Lansăm browser-ul cu slow motion
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://automationexercise.com/test_cases');
  await page.getByRole('button', { name: 'Consent' }).click();

  await page.getByRole('link', { name: ' Products' }).click();
  await expect(page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a')).toBeVisible();

  await page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
  await expect(page.getByText('Rs.')).toBeVisible();

  await page.getByText('Rs.').click();
  await page.locator('#quantity').click();

  await expect(page.locator('section')).toContainText('Add to cart');
  await page.getByRole('button', { name: ' Add to cart' }).click();

  await page.getByRole('link', { name: 'View Cart' }).click();
  await expect(page.getByRole('cell', { name: '' }).locator('a')).toBeVisible();

  await page.getByRole('cell', { name: '' }).locator('a').click();

  // Închidem browser-ul
  await browser.close();
});
