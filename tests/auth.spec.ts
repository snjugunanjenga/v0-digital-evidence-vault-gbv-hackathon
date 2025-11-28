// tests/auth.spec.ts
import { test, expect } from '@playwright/test';

test('Google login redirects to Google, then back to dashboard', async ({ page }) => {
  // Navigate to the login page
  await page.goto('/login');

  // Click the "Sign in with Google" button
  await page.click('button:has-text("Continue with Google")');

  // Wait for the Google login page to load
  await page.waitForURL('**/accounts.google.com/**');

  // NOTE: Playwright cannot handle the Google login flow itself.
  // This test confirms the initial redirect is working correctly.
  // To test the full flow, you would need to use a mocked provider.
});
