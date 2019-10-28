const BasePage = require("./BasePage");
const ClientsPage = require("./clientsPage")

class ClientsPageTest {
    constructor(testName) {
        this.Selenium = new BasePage(testName)
        this.logger = this.Selenium.logger
        this.Selenium = this.Selenium.selenium
        this.clientsPage = new ClientsPage(this.Selenium, this.logger)
    }
   
    // This function function type values in the Select and Search fields then check all client in the result list are relevant for
    // search values.
    async searchForClient(selectValue, searchValue) {
        await this.clientsPage.navigateToClientPage()
        await this.clientsPage.TypeSelectAndSearchValues(selectValue, searchValue)
        const numberOfClientsPasges = await this.clientsPage.getAmountOfClientsPages(4)
        await this.clientsPage.validateClientsResultsRelevance(numberOfClientsPasges, selectValue, searchValue)
    }

    // This function gets 'next' or 'previous' string as parameter, and according that clicks on this button, till the last
    // client page.
    async clickOnArrowToNavigateAllPages(locatorVal) {
        await this.clientsPage.navigateToClientPage()
        const clientsPagesamount = await this.clientsPage.getAmountOfClientsPages(4)
        await this.clientsPage.clickOnArrowToNavigateAllPages(clientsPagesamount, locatorVal)
    }

    // This method test all clients in the current page pop up screen using calling function in the clientsPage.
    // this test implements as stability test.
    async checkClientDetailsPopUpScreen() {
        await this.clientsPage.navigateToClientPage()
        await this.clientsPage.checkClientDetailsPopUpScreen()
    }
}
    
let clientPageTest = new ClientsPageTest('clientTest')

async function runClientPageTests() {
    // await clientPageTest.clickOnArrowToNavigateAllPages("next") // Stability test.
    await clientPageTest.searchForClient("owner", "Leila Howe")
    // await clientPageTest.checkClientDetailsPopUpScreen() // Stability test.
}

runClientPageTests()