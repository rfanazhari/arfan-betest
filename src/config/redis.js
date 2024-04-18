const redis = require('redis');
const config = require("../config/server")
require('dotenv').config();

class RedisConnector {

    constructor() {
        this.host = config.redis.host;
        this.port = config.redis.port;
        if (config.redis.password) {
            this.password = config.redis.password;
        }
        this.connected = false;
        this.client = null;
    }

    async getConnection() {
        let obj = this;
        if (obj.connected) {
            console.log("returning old redis client!");
            return obj.client;
        } else {
            let opt = {
                host: obj.host,
                port: obj.port
            }
            if (this.password) {
                opt.password = this.password
            }
            obj.client = redis.createClient(opt);

            obj.client.on('connect', function () {
                console.log('Redis Connecting!');
            });

            obj.client.on('ready', function () {
                console.log('Redis Ready!');
                obj.connected = true;
            });

            obj.client.on('error', function (e) {
                console.log(e)
                console.log('Error: redis disconnected!');
                obj.connected = false;
            });

            obj.client.on('end', function () {
                console.log('End: redis connection ended!');
                obj.connected = false;
            });

            obj.connected = true;
            console.log("connected to new redis client!");

            return obj.client;
        }
    }
}

module.exports = new RedisConnector();
