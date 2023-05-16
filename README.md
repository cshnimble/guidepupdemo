# Guidepup Demo
A demo repository for using [Guidepup](https://www.guidepup.dev/) with [Playwright](https://playwright.dev/)

## Installation

To install dependencies, run `npm install`

## Setup

### Windows

You will first need to install [NVDA](https://www.nvaccess.org/)

Once installed, you can then run the Guidepup setup by running the command `npx @guidepup/setup`

### MacOS

_Coming soon_

## Running the tests

To execute all of the tests, run the command `npx playwright test --headed`

### Windows

`npx playwright test --headed --project=NVDA`

### MacOS

`npx playwright test --headed --project=VoiceOver`

## Linting

Eslint has been set up including the [eslint playwright plugin](https://www.npmjs.com/package/eslint-plugin-playwright) and can be run using the script `npm run lint`
