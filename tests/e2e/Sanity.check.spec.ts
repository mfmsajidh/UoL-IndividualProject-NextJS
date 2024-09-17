import { expect, test } from '@playwright/test';

// Checkly is a tool used to monitor deployed environments, such as production or preview environments.
// It runs end-to-end tests with the `.check.spec.ts` extension after each deployment to ensure that the environment is up and running.
// With Checkly, you can monitor your production environment and run `*.check.spec.ts` tests regularly at a frequency of your choice.
// If the tests fail, Checkly will notify you via email, Slack, or other channels of your choice.
// On the other hand, E2E tests ending with `*.spec.ts` are only run before deployment.
// You can run them locally or on CI to ensure that the application is ready for deployment.

const targetUrl = process.env.ENVIRONMENT_URL || process.env.PRODUCTION_URL;

if (!targetUrl) {
  throw new Error(
    'Please set the ENVIRONMENT_URL or PRODUCTION_URL environment variable',
  );
}

test.describe('Sanity', () => {
  test.describe('Static pages', () => {
    test('should display the homepage', async ({ page }) => {
      await page.goto(targetUrl);

      await expect(
        page.getByRole('heading', {
          name: 'Revolutionary CV Generation',
        }),
      ).toBeVisible();
    });

    test('should navigate to the Privacy Policy page', async ({ page }) => {
      await page.goto(targetUrl);

      await page.getByRole('link', { name: 'Privacy Policy' }).click();
      await expect(page).toHaveURL(/privacy-policy$/);

      await expect(
        page.getByText('Welcome to CV Mate. We are', { exact: false }),
      ).toBeVisible();
    });

    test('should navigate to the Terms of Service page', async ({ page }) => {
      await page.goto(targetUrl);

      await page.getByRole('link', { name: 'Terms of Service' }).click();
      await expect(page).toHaveURL(/terms-of-service$/);

      await expect(
        page.getByText('By accessing or using the CV Mate service', {
          exact: false,
        }),
      ).toBeVisible();
    });
  });
});
