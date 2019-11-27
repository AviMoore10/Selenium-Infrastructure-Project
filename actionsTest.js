const BasePage = require('./BasePage')
const ActionsPage = require('./actionsPage')
const ClientPage = require('./clientsPage')


class ActionsPageTest {
    constructor(testName) {
        this.Selenium = new BasePage(testName)
        this.logger = this.Selenium.logger
        this.Selenium = this.Selenium.selenium
        this.actionsPage = new ActionsPage(this.Selenium, this.logger)
        this.clientPage = new ClientPage(this.Selenium, this.logger)
    }

    // This test crates new client and validate that the new client created successfully.
    async addClient(firstName, lastName, country, owner, email) {
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.createClient(firstName, lastName, country, owner, email)
        await this.clientPage.navigateToClientPage()
        await this.clientPage.TypeSelectAndSearchValues("name", firstName + " " + lastName)
        const numberOfClientsPasges = await this.clientPage.getAmountOfClientsPages(4)
        await this.clientPage.validateClientsResultsRelevance(numberOfClientsPasges, "name", firstName + " " + lastName)
        this.logger.info("Add Client test completed.")
    }

    // This test gets three parameters: name of client, one detail of the client that can update, and value that will be the updating.
    // The function update the givven client according to the other parameters and validate the update.
    async updateClientDetails(clientName, whatToChange, changeValue) {
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.typeClientNameInUpdateArea(clientName)
        await this.actionsPage.changeClientDetailInUpdateArea(whatToChange, changeValue)
        await this.actionsPage.validatePopUpMessageInfo()
        await this.clientPage.navigateToClientPage()
        await this.clientPage.TypeSelectAndSearchValues("name", clientName)
        await this.clientPage.checkClientDetailUpdated(whatToChange, changeValue)
    }
}

const actionsPageTest = new ActionsPageTest("actionsTest")

async function runActionsPageTest() {
    await actionsPageTest.addClient("gugu2", "Moore", "Israel", "janice", "aaaa@gmail.com")
        /* This line is a note --> Negative test, country argument is missing, please make sure the input client name isn't already exist.*/
    // await actionsPageTest.addClient("aaaa", "Moore", "", "janice", "aaaa@gmail.com")
    // await actionsPageTest.updateClientDetails("gugu2 moore", "email", "a")
        /* This line is a note --> negative test, the third argument is empty.*/
    // await actionsPageTest.updateClientDetails("gugu2 moore", "email", "") 
}

runActionsPageTest()