const HomePage = require('./homePage')
const BasePage = require('./BasePage')

class HomeTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.homePage = new HomePage(this.testSelenium)
    }

    // This method tests navigate to other pages then Home page by calling function in the HomePage and give it 3 parameters.
    async testNavigateToOtherPages(locatorType, locatoeVal, index) {
        await this.homePage.navigateToGivenPage(locatorType, locatoeVal, index)
    }

    // This method test the color button by calling function in the HpmePage.
    async addOrRemoveColor() {
        await this.homePage.addOrRemoveColor()
    }
}
const homeTest = new HomeTest()
homeTest.testNavigateToOtherPages("className", "nav-btn", 2) // Third parameter: 0 - Analytcs, 1 - Actions, 2 - client.
homeTest.addOrRemoveColor()

