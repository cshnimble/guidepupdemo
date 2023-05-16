import { voiceOver } from "@guidepup/guidepup";
import { test, expect } from "@playwright/test";

test.describe("Nimble website VoiceOver", () => {

    test.afterEach(async () => {
        await voiceOver.stop()
    })

    test.fixme("Navigate to careers site", async ({ page }) => {

        await page.goto("/", {
            waitUntil: "domcontentloaded",
        });
        // Force page to focus from address bar
        await page.bringToFront();
        // Start NVDA
        await voiceOver.start();

        while(!(await voiceOver.lastSpokenPhrase()).includes("Careers")) {
            await voiceOver.perform(voiceOver.keyboardCommands.findNextLink);
        }

        await voiceOver.perform(voiceOver.keyboardCommands.performDefaultActionForItem)

        await page.waitForLoadState('load')

        await voiceOver.perform(voiceOver.keyboardCommands.describeItemWithKeyboardFocus)
        
        // Assert that we've ended up where we expected
        const itemTextLog = (await voiceOver.itemTextLog());

        expect(!!itemTextLog.find(str => str.includes('Careers Nimble Approach'))).toBe(true)
    })
})