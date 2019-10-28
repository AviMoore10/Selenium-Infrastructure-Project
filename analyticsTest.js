const AnalyticsPage = require('./analyticsPage')
const ActionsPage = require('./actionsPage')
const BasePage = require('./BasePage')

class AnalyticsPageTest {
    constructor(testName) {
        this.Selenium = new BasePage(testName)
        this.logger = this.Selenium.logger
        this.Selenium = this.Selenium.selenium
        this.actionsPage = new ActionsPage(this.Selenium, this.logger)
        this.analyticsPage = new AnalyticsPage(this.Selenium, this.logger)
    }

    // this function checks the number of sent emails to costumer, creates new costumer and send him email, then validate the amount
    // of sent email grows in one.
    async sendEmailToClient(firstName, lastNmae) {
        await this.analyticsPage.navigateToAnalyticsPage()
        const amountOfSentEmails = await this.analyticsPage.getAmountOfChosenPadge(1)
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.createClient(firstName, lastNmae, "Israel", "janice", "aaaa@gmail.com")
        await this.actionsPage.validatePopUpMessageInfo()
        await this.actionsPage.typeClientNameInUpdateArea(firstName + " " + lastNmae)
        await this.actionsPage.changeClientDetailInUpdateArea("email", "a")
        await this.actionsPage.validatePopUpMessageInfo()
        await this.analyticsPage.navigateToAnalyticsPage()
        const newAmountOfSentEmails = await this.analyticsPage.getAmountOfChosenPadge(1)
        if (parseInt(newAmountOfSentEmails) == parseInt(amountOfSentEmails) + 1) {
            this.logger.info("The email was sent successfully")
        }
        else {
            this.logger.error("The email wasn't sent successfully")
        }
    }

    // This function gets the current amount outstanding clients, navigate to Action page, create new client, in the UPDATE area
    // change his status to sold client, then navigate to analytics page to validate that the outstanding client number updated.
    async sellToClient(firstNmae, lastName) {
        await this.analyticsPage.navigateToAnalyticsPage()
        const amountOfOutstandingClients = await this.analyticsPage.getAmountOfChosenPadge(2)
        await this.actionsPage.navigateToActionsPage()
        await this.actionsPage.createClient(firstNmae, lastName, "Israel", "janice", "aaaa@gmail.com")
        await this.actionsPage.typeClientNameInUpdateArea(firstNmae + " " + lastName)
        await this.actionsPage.changeClientDetailInUpdateArea("sold")
        await this.actionsPage.validatePopUpMessageInfo()
        await this.analyticsPage.navigateToAnalyticsPage()
        const newAmountOfOutstandingClients = await this.analyticsPage.getAmountOfChosenPadge(2)
        if (parseInt(newAmountOfOutstandingClients) == parseInt(amountOfOutstandingClients) + 1) {
            this.logger.info("Sold to costumer successfully")
        }
        else {
            this.logger.error("Didn't Sold to costumer")
        }
    }

    // This function Choosing option from the Sales By input list and then validate that the paragraph show relevant columns
    // according to the chosen option.
    async showEmailTypeInSalesBy(optionIndex, number) {
        await this.analyticsPage.navigateToAnalyticsPage()
        const salesByInput = await this.analyticsPage.clickAndGetSalesByInputElement()
        const arrayOfSalesByColumns = await this.analyticsPage.selectOptionFromSalesByMenu(salesByInput, number, optionIndex)
        await this.analyticsPage.validateNumberOfColumns(arrayOfSalesByColumns, number)
    }
}

const analyticsPageTest = new AnalyticsPageTest("analyticsPage")

async function runAnalyticsPageTest() {
    // analyticsPageTest.sendEmailToClient("vuvu", "moore")
    // analyticsPageTest.sellToClient("fufu", "moore")
    analyticsPageTest.showEmailTypeInSalesBy(2, 4) // Arguments: first - Sales By option index, second - number of expected columns.
}

runAnalyticsPageTest()