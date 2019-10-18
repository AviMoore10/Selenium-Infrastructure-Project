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
        await this.actionsPage.NavigateClientPageSearchForClient(firstName + " " + lastName)
        await this.actionsPage.validateClientExist(firstName, lastName)
    }

    // This test updates the client owner by calling  function in the actionsPage.
    async updateClientDetails(clientName, newOwner) {
        await this.actionsPage.updateClientDetails(clientName, newOwner)
    }
}

const actionsPageTest = new ActionsPageTest()
actionsPageTest.addClient("gugu2", "Moore", "Israel", "janice", "aaaa@gmail.com") 
actionsPageTest.addClient("gugu2", "Moore", " ", "janice", "aaaa@gmail.com") // Negative test , country argument is missing.
actionsPageTest.updateClientDetails("gugu moore", "Leila Howe")
actionsPageTest.updateClientDetails(" ", "Leila Howe") // negative test.