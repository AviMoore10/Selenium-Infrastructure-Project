const BasePage = require('./BasePage')
const ActionsPage = require('./actionsPage')


class ActionsPageTest {
    constructor() {
        this.Selenium = new BasePage().selenium
        this.actionsPage = new ActionsPage(this.Selenium)
    }

    // This test creates new client and validate it added successfully by calling functions in the actionsPage.
    async addClient (firstName, lastName, country, owner, email) {
        await this.actionsPage.addClient(firstName, lastName, country, owner, email)
        await this.actionsPage.NavigateToClientPageToSearchForClient(firstName + " " + lastName)
        await this.actionsPage.validateClientExist(firstName, lastName)
    }

    // This test updates the client owner by calling function in the actionsPage.
    async updateClientDetails(clientName, newOwner) {
        await this.actionsPage.updateClientDetails(clientName, newOwner)
    }
}

const actionsPageTest = new ActionsPageTest()

async function runActionsPageTest() {
    await actionsPageTest.addClient("gugu2", "Moore", "Israel", "janice", "aaaa@gmail.com")
    await actionsPageTest.addClient("aaaa", "Moore", "", "janice", "aaaa@gmail.com") // Negative test , country argument is missing.
    await actionsPageTest.updateClientDetails("gugu2 moore", "Leila Howe") // one need to be pop-up test exist.
    await actionsPageTest.updateClientDetails("gugu2 moore", "") // negative test.
}

runActionsPageTest()