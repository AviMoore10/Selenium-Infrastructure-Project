'use strict';

const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';


// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}


class Logger {
    constructor(testName) {
        this.date = new Date()
        this.logger = createLogger({
            // change level if in dev environment versus production
            level: env === 'production' ? 'info' : 'debug',
            format: format.combine(
                format.label({ label: path.basename(process.mainModule.filename) }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
            ),
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.printf(
                            info =>
                                `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
                        )
                    )
                }),
                new transports.File({
                    // In the getmonth function added paresInt( +1) because for some reason, it print the previous mounth instead of the current.
                    filename: 'C:/Users/Avi/Desktop/project/'+this.date.getDate() +"."+ parseInt(this.date.getMonth()+1) + "."+this.date.getFullYear()+'/'+testName+'.log' ,
                    format: format.combine(
                        format.printf(
                            info =>
                                `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
                        )
                    )
                })
            ]
        });
    }

}
module.exports = Logger;