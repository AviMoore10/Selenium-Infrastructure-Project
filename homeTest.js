const HomePage = require('./homePage')
const BasePage = require('./BasePage')

class HomeTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.homePage = new HomePage(this.testSelenium)
    }

    async testNavigateToOtherPages(locatorType, locatoeVal, index) {
        await this.homePage.navigateToGivenPage(locatorType, locatoeVal, index)
    }

    async addOrRemoveColor(locatorType, locatoeVal) {
        await this.homePage.addOrRemoveColor(locatorType, locatoeVal)
    }
}
const homeTest = new HomeTest()
homeTest.testNavigateToOtherPages("className", "nav-btn", 3) // Third parameter: 0 - Analytcs, 1 - Actions, 2 - client.
homeTest.addOrRemoveColor("className", "color-btn")

