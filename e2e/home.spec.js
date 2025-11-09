import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show page title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Horse Racing');
  });

  test('should show all components', async ({ page }) => {
    await expect(page.locator('.game-header')).toBeVisible();
    await expect(page.getByRole('button', { name: /GENERATE PROGRAM/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /START \/ PAUSE/i })).toBeVisible();
    await expect(page.locator('.game-content')).toBeVisible();
  });

  test('should show horse list', async ({ page }) => {
    await expect(page.locator('.left-panel')).toBeVisible();
    const horseRows = page.locator('tbody tr');
    await expect(horseRows.first()).toBeVisible({ timeout: 5000 });
    const horseCount = await horseRows.count();
    expect(horseCount).toBeGreaterThan(0);
  });

  test('should show generate program button', async ({ page }) => {
    const generateButton = page.getByRole('button', { name: /GENERATE PROGRAM/i });
    await expect(generateButton).toBeEnabled();
  });

  test('should disable start/pause button', async ({ page }) => {
    const startButton = page.getByRole('button', { name: /START \/ PAUSE/i });
    await expect(startButton).toBeDisabled();
  });
});

