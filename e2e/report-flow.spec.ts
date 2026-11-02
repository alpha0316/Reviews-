import { test, expect } from "@playwright/test";

test("sign up, write a restaurant report, see it under My reviews", async ({ page }) => {
  // Sign up
  await page.goto("/signup");
  await page.getByLabel("Nickname").fill("TestUser");
  await page.getByLabel("Password").fill("correct-horse-battery");
  await page.getByLabel(/I confirm I am 18/).check();
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page.getByText(/Save your recovery code/i)).toBeVisible();
  await page.getByRole("button", { name: /I've saved it/i }).click();
  await expect(page).toHaveURL("/");

  // Open the category sheet from the FAB and pick Restaurant
  await page.getByRole("button", { name: "Write a report" }).click();
  await page.getByRole("button", { name: "Restaurant" }).click();

  await expect(page).toHaveURL(/\/review\/new\?type=restaurant/);

  // Step 1: Select entity (search for an existing restaurant and pick it)
  await page.getByRole("textbox", { name: "Search for an entity" }).fill("Skyline");
  await page.getByRole("button", { name: /Skyline Grill/ }).click();
  await expect(page.getByText(/Selected:/)).toBeVisible();
  await page.getByRole("button", { name: "Continue" }).click();

  // Step 2: Tell your story
  await page
    .getByLabel("What happened?")
    .fill(
      "The food arrived cold and the bill had extra items we never ordered. Staff refused to adjust it when we asked."
    );
  await page.getByRole("button", { name: "Continue" }).click();

  // Step 3: How Was Your Experience (defaults are fine, all optional)
  await page.getByRole("button", { name: "Continue" }).click();

  // Step 4: Add your evidence + submit
  await page.getByRole("button", { name: "Submit report" }).click();

  await expect(page.getByRole("heading", { name: "Report submitted" })).toBeVisible();
  await page.getByRole("link", { name: "Go to My reviews" }).click();

  await expect(page).toHaveURL("/me");
  await expect(page.getByText("Skyline Grill")).toBeVisible();
  await expect(page.getByText(/cold and the bill had extra items/)).toBeVisible();
});

test("writing a report for an entity that doesn't exist yet", async ({ page }) => {
  await page.goto("/review/new?type=service");

  await page.getByRole("textbox", { name: "Search for an entity" }).fill("Totally New Garage");
  await page.getByRole("button", { name: /Add.*Totally New Garage/ }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByText("Totally New Garage")).toBeVisible();
});
