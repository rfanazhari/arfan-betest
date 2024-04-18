const jwt = require('jsonwebtoken');
const {tokenSecret} = require("../config/server");
const UserModel = require("../model/mongodb/user.model");

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({status: "error", message: 'Authorization token not provided'});
    }

    try {
        const decoded = jwt.verify(token, tokenSecret);
        if (!decoded) return res.status(401).json({status: "error", message: 'Invalid authorization token'});

        const user = await UserModel.findOne({emailAddress: decoded.email});
        if (!user) return res.status(403).json({status: "error", message: 'Invalid authorization token'});
        req.userId = decoded.sub;
        req.email = user?.emailAddress;

        next();
    } catch (error) {
        return res.status(401).json({status: "error", message: 'Invalid authorization token'});
    }
};

module.exports = {
    authenticateUser
}