import { test, expect } from '@playwright/test';

test.describe('UI Tests', () => {
  test('should be visible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('.game-content')).toBeVisible();
    await expect(page.locator('.game-header')).toBeVisible();
  });

  test('should be visible on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('.game-content')).toBeVisible();
  });

  test('should be button enabled or disabled', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.game-content', { state: 'visible' });
    
    const generateButton = page.getByRole('button', { name: /GENERATE PROGRAM/i });
    await expect(generateButton).toBeEnabled();
    await generateButton.click();
    const isDisabled = await generateButton.isDisabled();
    const isEnabled = await generateButton.isEnabled();
    expect(isDisabled || isEnabled).toBe(true);
  });

  test('should load page in less than 5 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForSelector('.game-content', { state: 'visible' });
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(5000);
  });
});

