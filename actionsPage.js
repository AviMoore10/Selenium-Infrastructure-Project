class ActionsPage {
    constructor(selenium,logger) {
        this.logger = logger
        this.selenium = selenium
    }

    // This function navigates to Actions page.
    async navigateToActionsPage() {
        this.selenium.getURL("https://lh-crm.herokuapp.com/actions")
        this.logger.info("Navigated to Actions page")
    }

    // The function waiting, using 1 second sleep to the pop up massage after creating/updating client, then by checking its nessage
    // validate if the client was added/updated or nor and console accordinglly.
    async validatePopUpMessageInfo() {
        await this.selenium.sleep()
        const actionContainer = await this.selenium.findElementBy("className", "actions-container")
        const popUpResult = await this.selenium.getTextFromElement("tagName", "div:nth-child(4)", null, actionContainer)
        if (popUpResult == "UPDATE SUCCESSFUL") {
            this.logger.info("The pop up message shows: 'UPDATE SUCCESSFUL'")
        }
        else if (popUpResult == "SOME DETAILS ARE MISSING") {
            this.logger.error("The pop up message shows: 'SOME DETAILS ARE MISSING'")
        }
    }

    // The function fill in the ADD CLIENT fields to create new client then call to another function that checks the pop up message.
    async createClient(firstName, lastName, country, owner, email) {
        await this.selenium.write(firstName, "id", "firstName")
        await this.selenium.write(lastName, "id", "lastName")
        await this.selenium.write(country, "id", "country")
        await this.selenium.write(owner, "css", "input#owner")
        await this.selenium.write(email, "id", "email")
        await this.selenium.clickElement("className", "add-client-btn")
        await this.validatePopUpMessageInfo(firstName, lastName)
    }

    // This function typing the client name in the Client field in the UPDATE area.
    async typeClientNameInUpdateArea(clientName) {
        const clientInput = await this.selenium.findElementBy("className", "client-input")
        await this.selenium.write(clientName, "tagName", "input", null, clientInput)
    }

    // The function gets parameter that contain one of the option that can be change in the UPDATE area and another parameter that
    // contains the new value to update. The function checkes what option the first parameter contain and according to that do the
    // update.
    async changeClientDetailInUpdateArea(whatToChange, newValue) {
        if (whatToChange.toLowerCase() == "owner") {
            const changeOwner = await this.selenium.findElementBy("className", "change-owner")
            const updateOwner = await this.selenium.findElementBy("tagName", "th:nth-child(2)", changeOwner)
            await this.selenium.write(newValue, "tagName", "input", null, updateOwner)
            const changeOwnerButton = await this.selenium.findElementBy("tagName", "th:nth-child(3)", changeOwner)
            await this.selenium.clickElement("tagName", "input", null, changeOwnerButton)
            await this.selenium.sleep()
        }
        else if (whatToChange.toLowerCase() == "email") {
            const changeEmail = await this.selenium.findElementBy("id", "change-email-type")
            const updateEmail = await this.selenium.findElementBy("tagName", "th:nth-child(2)", changeEmail)
            await this.selenium.write(newValue, "tagName", "input", null, updateEmail)
            const changeEmailButton = await this.selenium.findElementBy("tagName", "th:nth-child(3)", changeEmail)
            await this.selenium.clickElement("tagName", "input", null, changeEmailButton)
            await this.selenium.sleep()
        }
        else if (whatToChange.toLowerCase() == "sold") {
            const changeSold = await this.selenium.findElementBy("className", "change-sold")
            const updateSold = await this.selenium.findElementBy("tagName", "th:nth-child(2)", changeSold)
            await this.selenium.clickElement("tagName", "input", null, updateSold)
        }
        else {
            this.logger.error("Please check carefully your arguments and try again.")
        }
    }
}

module.exports = ActionsPage