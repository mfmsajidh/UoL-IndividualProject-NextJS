import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/test';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('should take screenshot of the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Revolutionary CV Generation',
        }),
      ).toBeVisible();

      await percySnapshot(page, 'Homepage');
    });

    test('should take screenshot of the Privacy Policy page', async ({
      page,
    }) => {
      await page.goto('/privacy-policy');

      await expect(
        page.getByText('Welcome to CV Mate. We are', { exact: false }),
      ).toBeVisible();

      await percySnapshot(page, 'Privacy Policy');
    });
  });
});
