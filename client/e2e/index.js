const { chromium } = require('playwright');

(async () => {
    // Create a Chromium browser instance
    const browser = await chromium.launch({ headless: false, slowMo: 100, devtools: true });

    // Create two isolated browser contexts
    const hostContext = await browser.newContext();
    const playerContext = await browser.newContext();

    const hostPage = await hostContext.newPage();
    const playerPage = await playerContext.newPage();


    // const page = await browser.newPage();
    await hostPage.goto('http://localhost:5000');

    // Load user and admin cookies
    // await userContext.addCookies('userCookies');
    // await adminContext.addCookies(adminCookies);
})();