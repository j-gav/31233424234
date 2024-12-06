import { test, expect } from '@playwright/test';

test('should toggle between grid and list view when view button is clicked', async ({ page }) => {
  await page.goto('/');

  const viewButton = page.locator('[data-test-id="view-button"]');

  const initialButtonTitle = await viewButton.getAttribute('title');
  expect(initialButtonTitle).toBe('Change to List view');

  await viewButton.click();

  const updatedButtonTitle = await viewButton.getAttribute('title');
  expect(updatedButtonTitle).toBe('Change to Grid view');
});

test('should toggle between grid and list view when theme button is clicked', async ({ page }) => {
  await page.goto('/');

  const themeButton = page.locator('[data-test-id="theme-button"]');

  const initialButtonTitle = await themeButton.getAttribute('title');
  expect(initialButtonTitle).toBe('Change to light color scheme');

  await themeButton.click();

  const updatedButtonTitle = await themeButton.getAttribute('title');
  expect(updatedButtonTitle).toBe('Change to dark color scheme');
});
