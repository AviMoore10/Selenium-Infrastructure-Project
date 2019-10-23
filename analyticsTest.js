const AnalyticsPage = require('./analyticsPage')
const ActionsPage = require('./actionsPage')
const BasePage = require('./BasePage')

class AnalyticsPageTest {
    constructor() {
        this.selenium = new BasePage().selenium
        this.actionsPage = new ActionsPage(this.selenium)
        this.analyticsPage = new AnalyticsPage(this.selenium)
    }

    // this function gets client name as parameter and using calling three function it checkes the current amount of clients that
    // email sent to them, then create client that hadn't sent email to, send him email and validate that the email sent to him.
    async sendEmailToClient(clientName) {
        const amountOfSentEmails = await this.analyticsPage.currentNumbersOfSentEmails()
        await this.actionsPage.addClient("gugu2", "Moore", "Israel", "janice", "aaaa@gmail.com")
        await this.analyticsPage.sendEmailToClient(amountOfSentEmails, clientName)
    }

    // This function gets the current amount outstanding clients, navigate to Action page, create new client, in the UPDATE area
    // change his status to sold client, then navigate to analytics page to validate that the outstanding client number updated.
    async sellToClient(clientName) {
        const AmountOfOutstandingClients = await this.analyticsPage.getAmountOfChosenPadge(2)
        await this.analyticsPage.navigateToChosenPage(1)
        await this.actionsPage.addClient("gugu2", "Moore", "Israel", "janice", "aaaa@gmail.com")
        await this.analyticsPage.sellAndValidateSoldToCostumer(AmountOfOutstandingClients, clientName)
    }

    // This function Choosing option from the Sales By input list and then validate that the paragraph show relevant columns
    // according to the chosen option.
    async showEmailTypeInSalesBy(optionIndex, number) {
        const salesByInput = await this.analyticsPage.clickAndGetSalesByInputElement()
        const arrayOfSalesByColumns = await this.analyticsPage.selectOptionFromSalesByMenu(salesByInput, number, optionIndex)
        await this.analyticsPage.validateNumberOfColumns(arrayOfSalesByColumns, number)
    }
}

const analyticsPageTest = new AnalyticsPageTest()

async function runAnalyticsPageTest() {
    analyticsPageTest.sendEmailToClient("gugu2 moore")
    analyticsPageTest.sellToClient("gugu2 moore")
    analyticsPageTest.showEmailTypeInSalesBy(2, 4) // Arguments: first - Sales By optionindex, second - number of expected columns.
}

runAnalyticsPageTest()