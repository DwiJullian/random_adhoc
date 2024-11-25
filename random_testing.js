const { Builder, By, until } = require('selenium-webdriver')
const { faker } = require('@faker-js/faker')

describe('Random Input Generation Test', function () {
    let driver

    this.timeout(600000)

    before(async function () {
        driver = await new Builder().forBrowser('firefox').build()
        await driver.get('https://elearning.uad.ac.id/login/index.php')
    })

    after(async function () {
        await driver.quit()
    })

    it('should fill the form with random data and submit', async function () {

        const specialChars = ['@', '*', '[', ']', '\\', '&', '$', "'", '!', '%', '^', ':', '.', '<', '>', '?', ')', '(', '{', '}', '~', '`', '+', '-', '=', '|']

        const generateSpecialCharString = () => 
            faker.helpers.arrayElements(specialChars, 10).join('')

        const randomNimEmail = (Math.floor(Math.random() * (2200016150 - 2200016001 + 1)) + 2200016001).toString() + '@gmail.com'

        const randomInputs = [
            generateSpecialCharString(),                     
            faker.internet.email(),
            faker.phone.number(),
            randomNimEmail
        ];

        const randomInput = randomInputs[Math.floor(Math.random() * randomInputs.length)]
        const randomPassword = faker.internet.password(8)

        await driver.sleep(2000)
        await driver.findElement(By.id('username')).sendKeys(randomInput)

        await driver.sleep(2000)
        await driver.findElement(By.id('togglePassword')).click()

        await driver.sleep(2000)
        await driver.findElement(By.id('password')).sendKeys(randomPassword)

        await driver.sleep(2000)
        await driver.findElement(By.id('loginbtn')).click()
    });
});
