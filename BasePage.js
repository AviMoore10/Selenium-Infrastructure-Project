const SeleniumInfra = require("./SeleniumInfra")
const Logger = require('./logger')

class BasePage {
  constructor(testName) {
    this.logger = new Logger(testName).logger
    this.selenium = new SeleniumInfra()
    
  }
}
module.exports = BasePage