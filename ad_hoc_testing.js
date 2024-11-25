const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Ad Hoc Testing untuk pengujian website w3schools', function () {
    let driver;

    this.timeout(60000)

    before(async function () {
        driver = await new Builder().forBrowser('firefox').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('seharusnya dapat berpindah halaman ke JavaScript Tutorial', async function () {
        await driver.get("https://www.w3schools.com/")
        await driver.findElement(By.css('div#subtopnav a[title="JavaScript Tutorial"]')).click()

        const main = await driver.findElement(By.xpath('//div[@id="main"]//h1[text()="JavaScript "]'))

        const textContent = await main.getText()

        expect(textContent).to.equal("JavaScript Tutorial")
    });

    it('seharusnya dapat berpindah halaman ke JS Let', async function () {

        const jsLet = await driver.findElement(By.xpath('//div[@id="sidenav"]//div[@id="leftmenuinner"]//div[@id="leftmenuinnerinner"]//a[text()="JS Let"]'))

        await jsLet.click()

        const jsLetPage = await driver.wait(until.elementLocated(By.xpath('//div[@id="belowtopnav"]//div[@class="w3-row w3-white"]//div[@id="main"]//h1[text()="JavaScript Let"]')))

        const textContent = await jsLetPage.getText()

        expect(textContent).to.equal("JavaScript Let")
    })
});
