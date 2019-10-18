class ActionsPage {
    constructor(selenium) {
        this.selenium = selenium
        this.selenium.getURL("https://lh-crm.herokuapp.com/actions")
    }

    // The method gets two strings variables first name and last name of client as parameters, navigate from Actions page to 
    // Client page, type name in the select field and type the first name and last name strings inthe search field.
    async NavigateClientPageSearchForClient(client) {
        const webPagesButtons = await this.selenium.findElementListBy("className", "nav-btn")
        await this.selenium.clickElement(null, null, webPagesButtons[2])
        await this.selenium.write("name", "className", "select-css")
        const searchClients = await this.selenium.findElementBy("className", "search-clients")
        await this.selenium.write(client ,"tagName", "input", null, searchClients)
        console.log("clients list updated")
    }

    // The method gets two strings variables first name and last name of client as parameters, runs all over the client list and 
    // make sure all clients has this name.
    async validateClientExist(firstName, lastName) {
        const clientsResults = await this.selenium.findElementListBy("className", "clientDetails")
        let clientResultFirstName
        let clientResultLastName
        let counter = 0
        for (let client of clientsResults) {
            clientResultFirstName = await this.selenium.getTextFromElement("tagName", "th", null, client)
            clientResultLastName = await this.selenium.getTextFromElement("tagName", "th:nth-child(2)", null, client)
            if (firstName.toLowerCase() === clientResultFirstName.toLowerCase() 
                && lastName.toLowerCase() === clientResultLastName.toLowerCase()) {
                    counter++
            }
            if (counter === clientsResults.length) {
                console.log("The client was found")
            }
            else {
                console.log("The client wasn't found")
            }
        }
    }

    // The method gets all 5 parameters to create new client and type them in their fields.
    async addClient(firstName, lastName, country, owner, email) {
        await this.selenium.write(firstName, "id", "firstName")
        await this.selenium.write(lastName, "id", "lastName")
        await this.selenium.write(country, "id", "country")
        await this.selenium.write(owner, "id", "owner")
        await this.selenium.write(email, "id", "email")
        await this.selenium.clickElement("className", "add-client-btn")
    }

    // This function gets 2 parameters - client name and name of new owner. The function type the client name in the client field
    // and type the new owner name in the 'Transfer ownership to' field and click the Transfer button, then using 
    // NavigateClientPageSearchForClient function nevaigate to Client page and search for the client and compare his owner
    // name to the new owner name parameter to validate the transfer.
    async updateClientDetails(clientName, newOwner) {
        const clientInput = await this.selenium.findElementBy("className", "client-input")
        await this.selenium.write(clientName, "tagName", "input", null, clientInput)
        const updateClient = await this.selenium.findElementBy("className", "update-client")
        await this.selenium.write(newOwner, "tagName", "input", null, updateClient)
        const changeOwner = await this.selenium.findElementBy("className", "change-owner")
        const changeOwnerButton = await this.selenium.findElementBy("tagName", "th:nth-child(3)", changeOwner)
        await this.selenium.clickElement("tagName", "input", null, changeOwnerButton)
        await this.NavigateClientPageSearchForClient(clientName)
        const clientDetails = await this.selenium.findElementBy("className", "clientDetails")
        const clientNewOwner = await this.selenium.getTextFromElement("tagName", "th:nth-child(5)", null, clientDetails)
        if (newOwner.toLowerCase() === clientNewOwner.toLowerCase()) {
            console.log("The new Owner updated")
        }
        else {
            console.log("The new Owner wasn't updated")
        }
    }
}

module.exports = ActionsPage