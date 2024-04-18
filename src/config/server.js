const dotenv = require('dotenv');
const Joi = require('joi');

// Load environment variables from .env file
dotenv.config();

// Define the configuration schema using Joi
const configSchema = Joi.object({
    PORT: Joi.string().required(),
    MONGO_URL: Joi.string().required(),
    TOKEN_SECRET: Joi.string().required(),
    TOKEN_EXP: Joi.string().required(),
    TIME_ZONE: Joi.string().optional(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PASSWORD: Joi.string().optional(),
    REDIS_PORT: Joi.string().required(),
}).unknown();

// Validate the configuration variables
const {error, value: config} = configSchema.validate(process.env);
if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
}

const serverConfig = {
    port: config.PORT,
    tokenSecret: config.TOKEN_SECRET,
    tokenExp: config.TOKEN_EXP,
    mongoUrl: config.MONGO_URL,
    timeZone: config.TIME_ZONE ?? "Asia/Jakarta",
    redis: {
        host: "redis",
        password: "your_redis_password",
        port: 6379,
    }
};

module.exports = serverConfig;