const userMongo = require("../model/mongodb/user.model");

async function setRedis(req, data) {
    let user = [];
    const get = await req.redis.get("dataUser");
    if (get) {

    } else {
        user.push(data);
        await req.redis.set("dataUser", JSON.stringify(user))
    }
}

async function getRedis(req, filter) {
    try {
        const data = await req.redis.get("dataUser");
        if (data) {
            const users = JSON.parse(data);
            const user = users.find(user => {
                if (filter.type === "identity") {
                    return user.identityNumber === filter.dataNumber;
                } else {
                    return user.accountNumber === filter.dataNumber;
                }
            });
            return user || null;
        }
    } catch (error) {
        console.error("Error retrieving data from Redis:", error);
        return null;
    }
}

const insertUser =  async (req, data = {}) => {
    try {
        let user = {
            userName: data.userName,
            accountNumber: data.accountNumber,
            emailAddress: data.emailAddress,
            identityNumber: data.identityNumber,
        };
        const insert = userMongo.create(user)
        user.id = insert._id;

        await setRedis(req, user);

        return {status: true, message: insert._id};
    } catch (e) {
        return {status: false, message: e.message || 'error'}
    }
}

const findOne = async (req, filter = {}) => {
    let filters = {accountNumber: filter.dataNumber};
    if (filter.type === "identity") filters = {identityNumber: filter.dataNumber};
    let user = {};

    try {
        const dataRedis = await getRedis(req, filter);
        if (dataRedis) user = dataRedis;
            else user = await userMongo.find(filters);

        return {status: true, message: user};
    } catch (e) {
        return {status: false, message: e.message || 'error'}
    }
}

const findByEmail = async (email) => {
    try {
        const user = await userMongo.find({emailAddress: email});
        return {status: true, message: user};
    } catch (e) {
        return {status: false, message: e.message || 'error'}
    }
}


module.exports = {
    insertUser,
    findOne,
    findByEmail
}