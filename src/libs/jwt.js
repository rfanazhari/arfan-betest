const {sign} = require("jsonwebtoken");
const {tokenSecret, tokenExp } = require("../config/server");
const generateToken = (payload) => {
    return sign({
        sub: payload._id,
        email: payload.emailAddress
    }, tokenSecret, {expiresIn: tokenExp});
}

module.exports = {
    generateToken
}