const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://dciindia.gov.in/DentistDetails.aspx');
    page.setViewport({ width: 1250, height: 969, deviceScaleFactor: 1 })
    await page.type('#MainContent_txtName', 'DOCTOR_NAME_HERE')
    await page.type('#MainContent_txtRegNo', 'REGISTRATION_NUMBER')
    await page.select('select[name="ctl00$MainContent$ddlSDC"]', 'STATS_CODE_FROM_SELECT')

    // Wait for page navigation
    await Promise.all([
        page.waitForNavigation(),
        page.click('#MainContent_btnSearch')
    ])

    const count = await page.$eval('#MainContent_lblCount', element => element.innerHTML);
    await console.log(count)

    await page.screenshot({ path: `screenshot-${Date.now()}.png` })

    await browser.close();
})();
