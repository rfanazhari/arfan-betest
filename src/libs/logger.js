const winston = require('winston');
const dateNow = new Date();

const optionsLogger = {
    file: {
        level: 'info',
        filename: `logs/log-${dateNow.getFullYear()}${dateNow.getMonth() + 1}${dateNow.getDate()}.log`,
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
        ),
        maxsize: 100 * 1024 * 1024,
        maxFiles: 10,
    },
    fileError: {
        level: 'error',
        filename: `logs/log-error-${dateNow.getFullYear()}${dateNow.getMonth() + 1}${dateNow.getDate()}.log`,
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
        ),
        maxsize: 100 * 1024 * 1024,
        maxFiles: 10,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
        ),
    }
}

// Create a logger instance
const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(optionsLogger.console),
        new winston.transports.File(optionsLogger.file), // Specify the log file name and location
    ],
});

module.exports = {
    logger,
    optionsLogger
};
