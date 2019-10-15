class HomePage {
    constructor(selenium) {
        this.selenium = selenium
        this.selenium.getURL("https://lh-crm.herokuapp.com/")
    }

    async navigateToGivenPage(locatorType, locatoeVal, index) {
        const navBar = await this.selenium.findElementListBy(locatorType, locatoeVal)
        await this.selenium.clickElement(null, null, navBar[index])
        if (index == 0) {
            await this.selenium.validURL("analytics")
        }
        else if (index == 1) {
            await this.selenium.validURL("actions")
        }
        else {
            await this.selenium.validURL("client")
        }
    }

    async addOrRemoveColor(locatorType, locatoeVal) {
        let colorButton = await this.selenium.findElementBy(locatorType, locatoeVal)
        const colorButtonText = colorButton.getText()
        await this.selenium.clickElement(null, null, colorButton)
        colorButton = await this.selenium.findElementBy(locatorType, locatoeVal)
        const ColorButtonNewText = colorButton.getText()
        if (colorButtonText != ColorButtonNewText) {
            console.log("Page color status changed successfully")
        }
        else {
            console.log("Page color status hasn't changed successfully")
        }
    }
}

module.exports = HomePage