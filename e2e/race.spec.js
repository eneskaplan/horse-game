import { test, expect } from '@playwright/test';

test.describe('Create Race Program and Start Race', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.game-content', { state: 'visible' });
  });

  test('should create race program', async ({ page }) => {
    const generateButton = page.getByRole('button', { name: /GENERATE PROGRAM/i });
    await generateButton.click();
    const startButton = page.getByRole('button', { name: /START \/ PAUSE/i });
    await expect(startButton).toBeEnabled({ timeout: 3000 });
    await expect(page.locator('.program-column')).toBeVisible();
  });

  test('should start race', async ({ page }) => {
    await page.getByRole('button', { name: /GENERATE PROGRAM/i }).click();
    const startButton = page.getByRole('button', { name: /START \/ PAUSE/i });

    await expect(startButton).toBeEnabled({ timeout: 3000 });
    await startButton.click();
    await expect(startButton).toBeEnabled();
    await expect(page.locator('.center-panel')).toBeVisible();
  });

  test('should pause race', async ({ page }) => {
    await page.getByRole('button', { name: /GENERATE PROGRAM/i }).click();
    await page.waitForTimeout(500);
    
    const startButton = page.getByRole('button', { name: /START \/ PAUSE/i });
    await expect(startButton).toBeEnabled({ timeout: 3000 });
    await startButton.click();
    await page.waitForTimeout(1000);
    await startButton.click();
    await expect(startButton).toBeEnabled();
  });

  test('should disable generate program button after starting race', async ({ page }) => {
    await page.getByRole('button', { name: /GENERATE PROGRAM/i }).click();
    const startButton = page.getByRole('button', { name: /START \/ PAUSE/i });
    await expect(startButton).toBeEnabled({ timeout: 3000 });
    await startButton.click();
    const generateButton = page.getByRole('button', { name: /GENERATE PROGRAM/i });
    await expect(generateButton).toBeDisabled();
  });
});

