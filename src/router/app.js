const express = require('express');
const cors = require('cors');
const expressWinston = require("express-winston");
const winston = require("winston");
const apiV1 = require("./v1");
const app = express();
const redis = require("../config/redis");
const {optionsLogger} = require("../libs/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*'
}));
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console(optionsLogger.console),
        new winston.transports.File(optionsLogger.file),
        new winston.transports.Http({
            level: 'warn',
            format: winston.format.combine(
                winston.format.json(),
                winston.format.timestamp(),
            ),
        }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
}))
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console(optionsLogger.console),
        new winston.transports.File(optionsLogger.fileError)
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
}))

app.use(async function (req, res, next) {
    req.redis = await redis.getConnection();
    next()
});

const prefix = "/apis";

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(`${prefix}/v1`, apiV1);

module.exports = app;