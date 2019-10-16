const BasePage = require("./BasePage");
const ClientsPage = require("./clientsPage")

class ClientsPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
    }
   
    // This methos testing searching client by calling to function in the clientsPage and give it 6 parameters.
    async searchForClient(locatorType, locatorVal, select, locatorType2, locatorVal2, select2) {
        await this.clientsPage.searchAndValidateClient(locatorType, locatorVal, select, locatorType2, locatorVal2, select2)
    }

    // This methos testing Navigating all clients pagaes by calling to function in the clientsPage and give it 2 parameters.
    // this test implements as stability test.
    async clickOnArrowToNavigateAllPages(locatoeType, locatorVal) {
        await this.clientsPage.clickOnArrowToNavigateAllPages(locatoeType, locatorVal)
    }

    // This method test all clients in the current page pop up screen using calling function in the clientsPage.
    // this test implements as stability test.
    async checkClientDetailsPopUpScreen() {
        await this.clientsPage.checkClientDetailsPopUpScreen()
    }
}
    
let clientPageTest = new ClientsPageTest()
clientPageTest.searchForClient("className", "select-css", "name", "className", "search-clients", "gugu moore")
clientPageTest.clickOnArrowToNavigateAllPages("name", "next")
clientPageTest.checkClientDetailsPopUpScreen()

