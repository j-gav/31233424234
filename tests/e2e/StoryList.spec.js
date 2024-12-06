import { test, expect } from '@playwright/test';

test('application should contain articles', async ({ page }) => {
  await page.goto('/');

  const stories = page.locator('[data-test-id="story-column"]');

  await expect(stories).toHaveCount(12);
});

test('should load more stories when scrolled', async ({ page }) => {
  await page.goto('/');

  const stories = page.locator('[data-test-id="story-column"]');

  await expect(stories).toHaveCount(12);

  await page.mouse.wheel(0, 1000);

  await expect(stories).toHaveCount(15);
});
