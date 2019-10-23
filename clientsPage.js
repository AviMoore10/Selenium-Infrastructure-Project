class ClientsPage {
        constructor(selenium) {
            this.selenium = selenium
            this.selenium.getURL("https://lh-crm.herokuapp.com/client")
        }

            // The function gets element and returns its text with his first leter as lower case.
            async returnLowerCaseName(locatorType, locatorValue, fromElement) {
                const nameElement = await this.selenium.findElementBy(locatorType, locatorValue, fromElement)
                const nameElementText = await nameElement.getText()
                return nameElementText.toLowerCase()
            }

            // This function gets two parameters - values for the Select and Search fields and fill those fields according.
            // After the client list upsate, the function return the number of the current clients pages.
            async searchAndValidateClient(selectValue, searchValue) {
                await this.selenium.write(selectValue, "className", "select-css")
                // using perent element to get the search input field element.
                const clientsComponent = await this.selenium.findElementBy("className", "search-clients") 
                await this.selenium.write(searchValue, "tagName", "input", null, clientsComponent)
                const pagesNumbers = await this.selenium.findElementBy("className", "page-numbers")
                const numOfPages = await this.selenium.getTextFromElement("tagName", "span:nth-child(4)", null, pagesNumbers)
                console.log("Select and Search fields were filled")
                return parseInt(numOfPages)
            }

            // The function gets two parameters, one of then its the number of the current clients pages. The function run, using a
            // loop, on all the pages and using another loop, run on all the clients in the pages and validate that all the sorting
            // clients are relevance for the search. Also the function counting How manny runs every loop does and compare it to
            // the number of pages parameter and number of clients in every page, for validate.
            async validateClientsResultsRelevance(numberOfClientsPasges, selectValue) {
                let numOfClientInPage = [], headCounter = 0
                for (let i = 0 ; i < numberOfClientsPasges ; i++) {
                    numOfClientInPage = await this.selenium.findElementListBy("className", "clientDetails")
                    let clientDetail, counter = 0
                    for (let client of numOfClientInPage) {
                        // Calling to another function that according to the select value and client element returns the 
                        // client detail in text.
                        clientDetail = await this.clientDetails(client, selectValue)
                        counter++
                    }
                    if (numOfClientInPage.length == counter) {
                        console.log("The number of the clients equal to the loop rounds")
                    }
                    else {
                        console.log("The number of the client ins't equal to the loop rounds - the loop stop")
                        break
                    }
                    headCounter++
                }
                if (numberOfClientsPasges == headCounter) {
                    console.log("The number of the client pages equal to the loop rounds")
                }
                else {
                    console.log("The number of the client pages ins't equal to the loop rounds")
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

            // async clearSelectAndSearchFields() {
            //     await this.selenium.clearElementField("className", "select-css")
            //     const searchClient = await this.selenium.findElementBy("className", "search-clients")
            //     await this.selenium.clearElementField("tagName", "input", null, searchClient)
            // }

            // This function gets one of the arrows locator type and value and click on it.
            async clickOnArrowToNavigate(locatorVal) {
                await this.selenium.clickElement("name", locatorVal)
            }

            // This function gets one of the arrows 'next' or 'previous' elements, and according to the parameter navigate through
            // all the clients pages to the last one. The function also counting the number of arrow clicking and compare it 
            // to the number of the clients pages for validation.
            async clickOnArrowToNavigateAllPages(arrowLocatorType, arrowLocatorValue) {
                const clientPagesNaviagte = await this.selenium.findElementBy("className", "page-numbers")
                const PagesAmountElement = await this.selenium.getTextFromElement("tagName", "span:nth-child(4)", null, clientPagesNaviagte)
                const numberOfPages = parseInt(PagesAmountElement)
                let countPages = 0 
                for (let i = 1 ; i < numberOfPages + 1 ; i++) {
                    // The function call to another function that click on one of the navigate arrows by give it the arrow locators 
                    // type and value.
                    await this.clickOnArrowToNavigate(arrowLocatorType, arrowLocatorValue)
                    countPages++
                }
                if (countPages === numberOfPages){
                    console.log("Navigated all client pages successfully")
                }
                else {
                    console.log("Not all pages was navigated")
                }
            }

            // This method clicks on all the clients in the current page to open their details pop up screen and then click to 
            // close it.
            async checkClientDetailsPopUpScreen() {
                const clientsList = await this.selenium.findElementListBy("className", "clientDetails")
                let counter = 0
                for (let client of clientsList) {
                    await this.selenium.clickElement(null, null, client)
                    await this.selenium.clickElement("className", "cancel-client-popup-btn")
                    counter++
                }
                if (counter === clientsList.length) {
                    console.log("clicked on all clients on page.")
                }
                else {
                    console.log("didn't clicked on all clients on page.")
                }
        }
    }

    module.exports = ClientsPage
    