class HomePage {
    constructor() {
        this.selenium = new BasePage().selenium
    }

    async returnText() {
        const text = await this.selenium.getTextFromElement("className", "table-header-th")
        console.log(text)
    }
}

const homePage = new HomePage()
homePage.returnText()