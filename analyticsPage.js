class AnalyticsPage {
    constructor(selenium, logger) {
        this.selenium = selenium
        this.logger = logger
    }

    // The function navigate to Analytics page.
    async navigateToAnalyticsPage() {
        this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
        this.logger.info("Navigated to Analitics page")
    }

    // This function gets one of the 4 data in the top of the page according to the given index, and returns it info as string.
    async getAmountOfChosenPadge(index) {
        // Putting long sleep because after navigating to Analytics page it takes up to 8 seconds to upload and get elements.
        await this.selenium.sleep(8000)
        let arrayOfBadges = await this.selenium.findElementListBy("className", "badge-val")
        const amountOfSentEmails = await this.selenium.getTextFromElement(null, null, arrayOfBadges[index])
        return amountOfSentEmails
    }
    
    // This function craete variable of the Sales By input element, then click on it and return it.
    async clickAndGetSalesByInputElement() {
        const salesByInput = await this.selenium.findElementBy("className", "select-css")
        await this.selenium.clickElement(null, null, salesByInput)
        return salesByInput
    }

    // The function gets two parameters - the Sales By input variable to help navigate to all the drop box options, the second is one of 
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
            this.logger.info("Sales By selecting made successfully")
        }
        else {
            this.logger.error("Sales By selecting wasn't made successfully")
        }
        await this.selenium.close()
    }
}

module.exports = AnalyticsPage