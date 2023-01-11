const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
	await page.goto("http://localhost:3000");
	await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
});

test("1280x720", async ({ page }) => {
	await new Promise((e) => setTimeout(e, 2000));
	expect(await page.screenshot()).toMatchSnapshot();
});

test("load diagnoses", async ({ page }) => {
	await page.locator("div[data-id=thumbnail-1]").click();
	await new Promise((e) => setTimeout(e, 6000));
	expect(await page.screenshot()).toMatchSnapshot();
	// check if the second diagnosis is loaded in full size
	await page.locator("div[data-id=thumbnail-2]").click();
	await new Promise((e) => setTimeout(e, 6000));
	expect(await page.screenshot()).toMatchSnapshot();
});
