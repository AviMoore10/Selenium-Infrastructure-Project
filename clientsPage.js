class ClientsPage {
    constructor(selenium,logger) {
        this.selenium = selenium
        this.logger = logger
    }

    // The function navigates to the 'client' function.
    async navigateToClientPage() {
        this.selenium.getURL("https://lh-crm.herokuapp.com/client")
        this.logger.info("Navigated to Client page")
    }

    // The function gets element and returns its text with his first leter as lower case.
    async returnLowerCaseName(locatorType, locatorValue, fromElement) {
        const nameElement = await this.selenium.findElementBy(locatorType, locatorValue, fromElement)
        const nameElementText = await nameElement.getText()
        return nameElementText.toLowerCase()
    }

    // This function gets two parameters - values for the Select and Search fields and fill those fields according.
    async TypeSelectAndSearchValues(selectValue, searchValue) {
        await this.selenium.write(selectValue, "className", "select-css")
        // using perent element to get the search input field element.
        const clientsComponent = await this.selenium.findElementBy("className", "search-clients")
        await this.selenium.write(searchValue, "tagName", "input", null, clientsComponent)
    }

    // The function gets the client pages number, Select and Search fields text values as parameters. The functions, using loop,
    // get the number of clients in the current page, and using nested loop passing all the clients in the page and validate that
    // all clients are relevant to the search values.
    async validateClientsResultsRelevance(numberOfClientsPages, selectValue, searchValue) {
        let numOfClientInPage = 0, headCounter = 0
        for (let i = 0; i < numberOfClientsPages; i++) {
            numOfClientInPage = await this.selenium.findElementListBy("className", "clientDetails")
                let clientDetail, counter = 0
                for (let client of numOfClientInPage) {
                    // Calling to another function that according to the select value and client element returns the 
                    // client detail in text.
                    clientDetail = await this.clientDetails(client, selectValue)
                    if (clientDetail.toLowerCase() == searchValue.toLowerCase()) {
                        counter++
                    }
                }
                if (numOfClientInPage.length == counter) {
                    this.logger.info(`itarate ${headCounter + 1} - The number of the clients equal to the loop iterates - All clients details are correct.`)
                }
                else {
                    this.logger.error(`itarate ${headCounter + 1} - The number of the client ins't equal to the loop iterates - the loop stop`)
                    break
                }
                await this.clickOnArrowToNavigate("next")
                headCounter++
            }
            if (numOfClientInPage == 0) {
                this.logger.error(`The page is empty from clients - No client with the name ${searchValue} was added`)
            }
    } 
    
    async checkClientDetailUpdated(selectValue, changedDetail) {
        const newClient = await this.selenium.findElementBy("className", "clientDetails")
        const newClientUpdatedDetail = await this.clientDetails(newClient, selectValue) 
        if (newClientUpdatedDetail.toLowerCase() == changedDetail.toLowerCase()) {
            this.logger.info("The client detail updated")
        }
        else {
            this.logger.error("The client detail wasn't updated")
        }
    }

    // This function gets client element and select value and according to the second return relevance client detail in text.
    async clientDetails(client, selectValue) {
        if (selectValue.toLowerCase() == "name") {
            return await this.selenium.getTextFromElement("tagName", "th", null, client) + " " +
                await this.selenium.getTextFromElement("tagName", "th:nth-child(2)", null, client)
        }
        else if (selectValue.toLowerCase() == "country") {
            return await this.selenium.getTextFromElement("tagName", "th:nth-child(3)", null, client)
        }
        else if (selectValue.toLowerCase() == "email") {
            return await this.selenium.getTextFromElement("tagName", "th:nth-child(4)", null, client)
        }
        else if (selectValue.toLowerCase() == "owner") {
            return await this.selenium.getTextFromElement("tagName", "th:nth-child(5)", null, client)
        }
        else if (selectValue.toLowerCase() == "sold") {
            return await this.selenium.getTextFromElement("tagName", "th:nth-child(6)", null, client)
        }
        else {
            return await this.selenium.getTextFromElement("tagName", "th:nth-child(8)", null, client)
        }
    }

    // This function gets one of the arrows locator type and value and click on it.
    async clickOnArrowToNavigate(locatorVal) {
        await this.selenium.clickElement("name", locatorVal)
    }

    // The function gets index parameter, and according to that gets from the pape-numbers one of the indication elements as string,
    // then returns it.
    async getAmountOfClientsPages(index) {
        const clientPagesNaviagte = await this.selenium.findElementBy("className", "page-numbers")
        const PagesAmount = await this.selenium.getTextFromElement("tagName", `span:nth-child(${index})`, null, clientPagesNaviagte)
        return parseInt(PagesAmount)
    }

    // The function gets number of current client pages and one of the navigates through pages arrow element. The function, using
    // loop clicks on the arrow element till she's passing all the pages, then validate she did pass all pages.
    async clickOnArrowToNavigateAllPages(clientsPagesamount, arrowLocatorValue) {
        let countPages = 0
        for (let i = 1; i < clientsPagesamount + 1; i++) {
            // The function call to another function that click on one of the navigate arrows by give it the arrow locators 
            // type and value.
            await this.clickOnArrowToNavigate(arrowLocatorValue)
            countPages++
        }
        if (countPages === clientsPagesamount) {
            this.logger.info("Navigated all client pages successfully")
        }
        else {
            this.logger.error("Not all pages was navigated")
        }
        const lastPage = await this.getAmountOfClientsPages(2)
        if (parseInt(lastPage) === clientsPagesamount) {
            this.logger.info("The last page index is equal to number of pages")
        }
        else {
            this.logger.error("The last page index is no equal to the number of the pages - negative result")
        }
    }

    // This function, using loop, passing all the clients in the current page, clicks each client and validate his name is equal to
    // the name in the pop-up details screen.
    async checkClientDetailsPopUpScreen() {
        // Putting sleep because sometimes the test is faster then the driver and instead of getting real clients amount it gets 0.
        await this.selenium.sleep(2000)
        const clientsList = await this.selenium.findElementListBy("className", "clientDetails")
        let counter = 0, nameInput, nameInputValue, clientName
        for (let client of clientsList) {
            clientName = await this.clientDetails(client, "name")
            await this.selenium.clickElement("tagName", "th:nth-child(2)", null, client)
            nameInput = await this.selenium.findElementBy("id", "name")
            nameInputValue = await nameInput.getAttribute("value")
            if (nameInputValue == clientName) {
                counter++
            }
            await this.selenium.clickElement("className", "cancel-client-popup-btn")
        }
        if (counter === clientsList.length) {
            if (clientsList.length == 0) {
                this.logger.info("Despite of Sleep, the clients num is 0, the internet might be slow")
            }
            else {
                this.logger.error("clicked on all clients on page.")
            }
        }
        else {
            this.logger.error("didn't clicked on all clients on page.")
        }
    }
}

module.exports = ClientsPage
