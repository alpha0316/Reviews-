import { test, expect } from "@playwright/test";

// Real-device-style touch interaction tests, run specifically against the
// WebKit engine (`--project=mobile-webkit`). Chromium's mobile emulation
// does not reproduce WebKit-only bugs like nested `position: sticky`
// hit-testing, where taps inside a sticky element nested in another sticky
// ancestor land on stale coordinates.

test("FAB opens the category sheet via a real tap", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Write a report" }).tap();
  await expect(page.getByRole("dialog", { name: "Choose a category" })).toBeVisible();
});

test("FAB works after scrolling the page", async ({ page }) => {
  await page.goto("/");
  await page.locator(".overflow-y-auto").first().evaluate((el) => el.scrollBy(0, 600));
  await page.waitForTimeout(150);
  await page.getByRole("button", { name: "Write a report" }).tap();
  await expect(page.getByRole("dialog", { name: "Choose a category" })).toBeVisible();
});

test("subject profile tabs respond to taps", async ({ page }) => {
  await page.goto("/s/palmview-estate");

  await page.getByRole("tab", { name: "Evidence" }).tap();
  await expect(page.getByText("Documents")).toBeVisible();

  await page.getByRole("tab", { name: "Reviews" }).tap();
  await expect(page.getByText("Trending in reviews")).toBeVisible();

  await page.getByRole("tab", { name: "General" }).tap();
  await expect(page.getByText("Red flags people reported")).toBeVisible();
});

test("subject profile tabs respond to taps after scrolling", async ({ page }) => {
  await page.goto("/s/palmview-estate");
  await page.locator(".overflow-y-auto").first().evaluate((el) => el.scrollBy(0, 400));
  await page.waitForTimeout(150);

  await page.getByRole("tab", { name: "Evidence" }).tap();
  await expect(page.getByText("Documents")).toBeVisible();
});

test("bottom nav items respond to taps", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "My Reviews" }).tap();
  await expect(page).toHaveURL("/me");
});

test("category tile taps filter discover", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Housing" }).tap();
  await expect(page).toHaveURL(/cat=housing/);
});
