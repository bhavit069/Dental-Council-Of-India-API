const { request } = require('https');
const puppeteer = require('puppeteer');

const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
];

async function findUser(name, regCode, stateCode) {
    const browser = await puppeteer.launch({
        headless: true,
        args: minimal_args,
        userDataDir: './cache'
    });
    const page = await browser.newPage();

    const blocked_domains = [
        'maps.gstatic.com',
        'maps.googleapis.com'
    ]

    await page.setRequestInterception(true);
    page.on('request', request => {
        const url = request.url()
        if (blocked_domains.some(domain => url.includes(domain))) {
            request.abort();
        } else {
            request.continue();
        }
    })

    await page.goto('https://dciindia.gov.in/DentistDetails.aspx');
    page.setViewport({ width: 1250, height: 969, deviceScaleFactor: 1 })
    await page.type('#MainContent_txtName', name)
    await page.type('#MainContent_txtRegNo', regCode)
    await page.select('select[name="ctl00$MainContent$ddlSDC"]', stateCode)

    // Wait for page navigation
    await Promise.all([
        page.waitForNavigation(),
        page.click('#MainContent_btnSearch')
    ])

    const count = await page.$eval('#MainContent_lblCount', element => element.innerHTML);
    await console.log(count.split(':')[1])
    

    // await page.screenshot({ path: `screenshot-${Date.now()}.png` })

    await browser.close();
}const { request } = require('https');
const puppeteer = require('puppeteer');

const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
];

async function findUser(name, regCode, stateCode) {
    const browser = await puppeteer.launch({
        headless: true,
        args: minimal_args,
        userDataDir: './cache'
    });
    const page = await browser.newPage();

    const blocked_domains = [
        'maps.gstatic.com',
        'maps.googleapis.com'
    ]

    await page.setRequestInterception(true);
    page.on('request', request => {
        const url = request.url()
        if (blocked_domains.some(domain => url.includes(domain))) {
            request.abort();
        } else {
            request.continue();
        }
    })

    await page.goto('https://dciindia.gov.in/DentistDetails.aspx');
    page.setViewport({ width: 1250, height: 969, deviceScaleFactor: 1 })
    await page.type('#MainContent_txtName', name)
    await page.type('#MainContent_txtRegNo', regCode)
    await page.select('select[name="ctl00$MainContent$ddlSDC"]', stateCode)

    // Wait for page navigation
    await Promise.all([
        page.waitForNavigation(),
        page.click('#MainContent_btnSearch')
    ])

    const count = await page.$eval('#MainContent_lblCount', element => element.innerHTML);
    await console.log(count.split(':')[1])

    await browser.close();
}
