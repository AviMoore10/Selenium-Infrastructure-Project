class HomePage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToHomePage() {
        this.selenium.getURL("https://lh-crm.herokuapp.com/")
        console.log("Navigated to Home page")
    }

    // This Method gets index parameter to locate page button, click on this button and validate it navigate to the right page.
    async navigateToGivenPage(index) {
        const navBar = await this.selenium.findElementListBy("className", "nav-btn")
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

    // This method clicks on the color button and validate the color status has changed after click.
    async addOrRemoveColor() {
        let colorButtonText = await this.selenium.getTextFromElement("className", "color-btn")
        await this.selenium.clickElement("className", "color-btn")
        const ColorButtonNewText = await this.selenium.getTextFromElement("className", "color-btn")
        if (colorButtonText != ColorButtonNewText) {
            console.log("Page color status changed successfully")
        }
        else {
            console.log("Page color status hasn't changed successfully")
        }
    }
}

module.exports = HomePage