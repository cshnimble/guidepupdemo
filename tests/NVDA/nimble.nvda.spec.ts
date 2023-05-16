import { nvda } from "@guidepup/guidepup";
import { test, expect } from "@playwright/test";

test.describe("Nimble website NVDA", () => {

    test.afterEach(async () => {
        // ensure NVDA has finished
        await nvda.stop()
    })

    test("Navigate to careers site", async ({ page }) => {

        await page.goto("/", {
            waitUntil: "domcontentloaded",
        });
        // Force page to focus from address bar
        await page.bringToFront();
        // Start NVDA
        await nvda.start();

        while(!(await nvda.lastSpokenPhrase()).includes("Careers")) {
            await nvda.perform(nvda.keyboardCommands.readNextFocusableItem);
        }

        await nvda.perform(nvda.keyboardCommands.performDefaultActionForItem)

        await page.waitForLoadState('load')

        await nvda.perform(nvda.keyboardCommands.reportCurrentFocus)
        
        // Assert that we've ended up where we expected
        const itemTextLog = (await nvda.itemTextLog());

        expect(!!itemTextLog.find(str => str.includes('Careers Nimble Approach'))).toBe(true)
    })
})