import { test, expect } from '@playwright/test';

test('should render a story title', async ({ page }) => {
  await page.goto('/');

  const storyTitle = page.locator('[data-test-id="story-component"] .v-card-title').first();

  const titleText = await storyTitle.textContent();

  expect(titleText).not.toBeNull();
  expect(titleText).not.toBe('');
});

test('should display time ago string containing "ago"', async ({ page }) => {
  await page.goto('/');

  const timeAgoText = await page.locator('[data-test-id="formatted-date"]').first().textContent();
  expect(timeAgoText).toMatch(/ago/);
});
