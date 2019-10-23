const BasePage = require("./BasePage");
const ClientsPage = require("./clientsPage")

class ClientsPageTest {
    constructor() {
        this.testSelenium = new BasePage().selenium
        this.clientsPage = new ClientsPage(this.testSelenium)
    }
   
    // This function gets two parameters - values to the Select and Search fields, sorting clients results according to the 
    // parameters and then validate the results.
    async searchForClient(selectValue, searchValue) {
        const numberOfClientsPasges = await this.clientsPage.searchAndValidateClient(selectValue, searchValue)
        await this.clientsPage.validateClientsResultsRelevance(numberOfClientsPasges, selectValue)
    }

    // This function gets parameter and then call a function that Navigates through the clients pages according to the parameter.
    async clickOnArrowToNavigateAllPages(locatorVal) {
        await this.clientsPage.clickOnArrowToNavigateAllPages(locatorVal)
    }

    // This method test all clients in the current page pop up screen using calling function in the clientsPage.
    // this test implements as stability test.
    async checkClientDetailsPopUpScreen() {
        await this.clientsPage.checkClientDetailsPopUpScreen()
    }
}
    
let clientPageTest = new ClientsPageTest()

async function runClientPageTests() {
    await clientPageTest.clickOnArrowToNavigateAllPages("next") // Stability test.
    await clientPageTest.searchForClient("owner", "Leila Howe")
    await clientPageTest.checkClientDetailsPopUpScreen() // Stability test.
}

runClientPageTests()