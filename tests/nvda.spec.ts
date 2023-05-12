import { nvda } from "@guidepup/guidepup";
import { test,expect } from "@playwright/test";
import { itemTextSnapshot } from "../fixtures/itemTextSnapshot";

test.describe("Playwright NVDA", () => {

  // test.beforeEach(async() => {
  //   await nvda.start()
  // })

  test.afterEach(async() => {
    await nvda.stop()
  })

  test("I can navigate the Guidepup Github page", async ({
    page
  }) => {
    // Navigate to Guidepup GitHub page
    await page.goto("https://github.com/guidepup/guidepup", {
      waitUntil: "domcontentloaded",
    });

    // Wait for page to be ready and interact
    await expect(page.locator('header[role="banner"]')).toBeVisible();
    // Force page to focus from address bar
    await page.bringToFront();
    // Start NVDA
    await nvda.start();

    // Move across the page menu to the Guidepup heading using VoiceOver
    while (!(await nvda.lastSpokenPhrase()).includes("Guidepup, heading, level 1")) {
      await nvda.perform(nvda.keyboardCommands.moveToNextHeading);
    }

    // Assert that we've ended up where we expected and what we were told on
    // the way there is as expected.
    const itemTextLog = (await nvda.itemTextLog());
    // Sanitise the results to remove commas
    const itemTextLogSanitise = itemTextLog.map((i, j) => { return i.replaceAll(",", "") })

    for (const expectedItem of itemTextSnapshot) {
      expect(!!itemTextLogSanitise.find(log => log.includes(expectedItem.replace(',', '')))).toBe(true);
    }
  });
});