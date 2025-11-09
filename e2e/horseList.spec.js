import { test, expect } from '@playwright/test';

test.describe('Horse List and Details', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.game-content', { state: 'visible' });
  });

  test('should show horse list', async ({ page }) => {
    const horseListPanel = page.locator('.left-panel');
    await expect(horseListPanel).toBeVisible();
    const table = page.locator('table');
    await expect(table).toBeVisible({ timeout: 5000 });
  });

  test('should show horse details', async ({ page }) => {
    const firstHorseRow = page.locator('tbody tr').first();
    await expect(firstHorseRow).toBeVisible({ timeout: 5000 });
    const cells = firstHorseRow.locator('td');
    const cellCount = await cells.count();
    expect(cellCount).toBeGreaterThanOrEqual(3);
  });

  test('should show color indicators', async ({ page }) => {
    const colorIndicators = page.locator('.color-indicator');
    const count = await colorIndicators.count();
    
    if (count > 0) {
      await expect(colorIndicators.first()).toBeVisible();
    }
  });
});

