class AnalyticsPage {
    constructor(selenium) {
        this.selenium = selenium
        this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
    }

    // This function write client name, it gets in parameter, in the client field in the Action page under UPDATE.
    async writeClientNameInClientfield(clientName) {
        const clientInput = await this.selenium.findElementBy("className", "client-input")
        await this.selenium.write(clientName, "tagName", "input", null, clientInput)
    }

    // Using this function it can navigate to all other pages from the Analytics page according to given index.
    async navigateToChosenPage(index) {
        const webPagesButtons = await this.selenium.findElementListBy("className", "nav-btn")
        await this.selenium.clickElement(null, null, webPagesButtons[index])
    }

    // This function gets one of the 4 data in the top of the page according to the given index, and returns it.
    async getAmountOfChosenPadge(index) {
        let arrayOfBadges = await this.selenium.findElementListBy("className", "badge-val")
        const amountOfSentEmails = await this.selenium.getTextFromElement(null, null, arrayOfBadges[index])
        return amountOfSentEmails
    }

    // This function gets number of sent Email as it present in the analytics page, then navigate to the Action page and then
    // return the current nymber of sent emails in variable.
    async currentNumbersOfSentEmails() {
        const amountOfSentEmails = await this.getAmountOfChosenPadge(1)
        await this.navigateToChosenPage(1)
        return amountOfSentEmails
    }

    // This function gets client name as parameter, send email to him through the UPDATE area, navigates to the analytics page
    // and check that the number of sent emails updated.
    async sendEmailToClient(amountOfSentEmails, clientName) {
        await this.writeClientNameInClientfield(clientName)
        const emailType = await this.selenium.findElementBy("id", "change-email-type")
        await this.selenium.write("a", "tagName", "input", null, emailType)
        const sendButton = await this.selenium.findElementBy("tagName", "th:nth-child(3)", emailType)
        await this.selenium.clickElement("tagName", "input", null, sendButton)
        await this.navigateToChosenPage(1)
        const newAmountOfSentEmails = await this.getAmountOfChosenPadge(1)
        if (newAmountOfSentEmails == parseInt(amountOfSentEmails) + 1) {
            console.log("Email sent Successfully")
        }
        else {
            console.log("Email wasn't sent Successfully")
        }
    }

    // This function gets client name as parameter, search him in the client page and making sure hes not been sold to, then
    // navigates to the Actions page and using the UPDATE area change the client to Sold status and then vavigate to Client page
    // and validate the number of Outstanding clients changed accordinglly.
    async sellAndValidateSoldToCostumer(amountOfOutstandingClients, clientName) {
        const searchField = await this.selenium.findElementBy("className", "search-clients")
        await this.selenium.write(clientName, "tagName", "input", null, searchField)
        const clientDetails = await this.selenium.findElementBy("className", "clientDetails")
        const soldStatus = await this.selenium.getTextFromElement("tagName", "th:nth-child(6)", null, clientDetails)
        if (soldStatus == "NO") {
            console.log("Can rely on this test")
        }
        else {
            console.log("Should test with another client that hasn't got Enail yet")
        }
        await this.navigateToChosenPage(2)
        await this.writeClientNameInClientfield(clientName)
        const changeSold = await this.selenium.findElementBy("className", "change-sold")
        await this.selenium.clickElement("tagName", "input", null, changeSold)
        await this.navigateToChosenPage(1)
        const newAmountOfOutstandingClients = await this.getAmountOfChosenPadge(2)
        if (newAmountOfOutstandingClients == parseInt(amountOfOutstandingClients) + 1) {
            console.log("Email sent to client successfully")
        }
        else {
            console.log("Email wasn't sent to client successfully")
        }
    }
    
    // This function craete variable of the Sales By onput element, then click on it and return it.
    async clickAndGetSalesByInputElement() {
        const salesByInput = await this.selenium.findElementBy("className", "select-css")
        await this.selenium.clickElement(null, null, salesByInput)
        return salesByInput
    }

    // The gets two parameters - the Sales By input variable to help navigate to all the drop box option, the second is one of 
    // the options index to get to it. The function clicks on the option she gets.
    async chooseOptionFromSalesBy(salesByInput, optionIndex) {
        // First click on the first option, because without sometimes the test can't click on the chosen option.
        await this.selenium.clickElement("tagName", "option", null, salesByInput)
        if (optionIndex === 1) {
            await this.selenium.clickElement("tagName", "option", null, salesByInput)
        }
        if (optionIndex === 2) {
            await this.selenium.clickElement("tagName", "option:nth-child(2)", null, salesByInput)
        }
        else if (optionIndex === 3) {
            await this.selenium.clickElement("tagName", "option:nth-child(3)", null, salesByInput)
        }
        else {
            await this.selenium.clickElement("tagName", "option:nth-child(4)", null, salesByInput)
        }
    }

    // The function gets 3 arguments - the Sales By input element number, number of expected columns and index of one of the 
    // Sales By options. The function choosing the option according to the index she gets.
    async selectOptionFromSalesByMenu(salesByInput, number, optionIndex) {
        let arrayOfSalesByColumns = []
        let arrayOfAllChartsColumns, salesBycolumnsChart
        let counter = 0
        // Using loop because in the Selenium driver the option choosing not always succeed in the first try.
        while (arrayOfSalesByColumns.length != number) {
            await this.chooseOptionFromSalesBy(salesByInput, optionIndex)
            // Gets all charts columns in array, helps navigate to the Sales By columns.
            arrayOfAllChartsColumns = await this.selenium.findElementListBy("className", "recharts-xAxis xAxis")
            salesBycolumnsChart= await this.selenium.findElementBy("className", "recharts-cartesian-axis-ticks", arrayOfAllChartsColumns[1])
            arrayOfSalesByColumns = await this.selenium.findElementListBy("tagName", "tspan", salesBycolumnsChart)
            // Up to 10 loops in order avoiding infinity.
            counter++
            if (counter === 10) {
                break
            }
        }
        return arrayOfSalesByColumns
    }

    // The function gets 2 arguments - the current number of Sales By columns and number of expected columns and check if they are 
    // equal anf console related message.
    async validateNumberOfColumns(arrayOfSalesByColumns, number) {
        if (arrayOfSalesByColumns.length === number) {
            console.log("Sales By selecting made successfully")
        }
        else {
            console.log("Sales By selecting wasn't made successfully")
        }
        await this.selenium.close()
    }
}

module.exports = AnalyticsPage