const { chromium } = require('playwright');

(async () => {
    // Create a Chromium browser instance
    const browser = await chromium.launch({ headless: false, slowMo: 100, devtools: true });

    // Create three isolated browser contexts
    const hostContext = await browser.newContext();
    const player1Context = await browser.newContext();
    const player2Context = await browser.newContext();

    const hostPage = await hostContext.newPage();
    const player1Page = await player1Context.newPage();
    const player2Page = await player2Context.newPage();


    // HOST = create a game
    await hostPage.goto('http://localhost:3000');
    await hostPage.click('span:text("Start Game")');
    await hostPage.fill('input:below(span:text("Username"))', 'Host');
    await hostPage.click('span:text("Start a game")');
    const gameID = await hostPage.textContent('h1');

    // PLAYER = use gameID and join the game
    await player1Page.goto(`http://localhost:3000/${gameID}`);
    await player1Page.fill('input:below(span:text("Username"))', 'first player');
    await player1Page.click('span:text("Join the game")');

    // PLAYER2 = use gameID and join the game
    await player2Page.goto(`http://localhost:3000/${gameID}`);
    await player2Page.fill('input:below(span:text("Username"))', 'second player');
    await player2Page.click('span:text("Join the game")');

    // HOST = started the game
    await hostPage.click('span:text("Start the Game")');

    // Load player and host cookies
    // await userContext.addCookies('userCookies');
})();