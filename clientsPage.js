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

            // This method gets the locator's type and value of the select field and search field on the page and fill them with 
            // values for search, then validate that the search successfully completed.
            async searchAndValidateClient(locatorType, locatorVal, selectValue, locatorType2, locatorVal2, searchValue) {
                await this.selenium.write(selectValue, locatorType, locatorVal)
                // using perent element to get the search input field element.
                const clientsComponent = await this.selenium.findElementBy(locatorType2, locatorVal2) 
                await this.selenium.write(searchValue, "tagName", "input", null, clientsComponent)
                const searchedClient = await this.selenium.findElementBy("className", "clientDetails")
                const firstName = await this.returnLowerCaseName("tagName", "th", searchedClient)
                const lastName = await this.returnLowerCaseName("tagName", "th:nth-child(2)", searchedClient)
                if (searchValue.includes(firstName) && searchValue.includes(lastName)) {
                    console.log("The client search made successfully - the client found")
                }
                else {
                    console.log("The client wasn't found")
                }
            }

            // This function gets one of the arrows locator type and value and click on it.
            async clickOnArrowToNavigate(locatoeType, locatorVal) {
                await this.selenium.clickElement(locatoeType, locatorVal)
            }

            // This method gets one of the arrows locator type and value, checks how much clients pages there are and clicks on the
            // chosen arrow many times as the pages ampount, then validate it realy navigated all pages.
            async clickOnArrowToNavigateAllPages(arrowLocatorType, arrowLocatorValue) {
                const clientPagesNaviagte = await this.selenium.findElementBy("className", "page-numbers")
                const PagesAmountElement = await this.selenium.findElementBy("tagName", "span:nth-child(4)", clientPagesNaviagte)
                const numberOfPages = parseInt(await PagesAmountElement.getText())
                let countPages = 0 // every loop - this variable value grows in one. then using it to verufy number of loops.
                for (let i = 1 ; i < numberOfPages + 1 ; i++) {
                    await this.clickOnArrowToNavigate(arrowLocatorType, arrowLocatorValue)
                    countPages++
                }
                // validate that the test navigated all client pages.
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
                for (let client of clientsList) {
                    await this.selenium.clickElement(null, null, client)
                    await this.selenium.clickElement("className", "cancel-client-popup-btn")
                }
                console.log("clicked on all clients on page.")
            }
        }

    module.exports = ClientsPage
    