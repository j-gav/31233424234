import { test, expect } from '@playwright/test';

test('application should have the correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Welcome to Hacker News/);
});
