const {userCreateSchema, userLoginSchema} = require("./request/user.request");
const {generateToken} = require("../libs/jwt");
const UserUsecase = require("../usecase/user.usecase");

const createUser = async (req, res) => {
    const {error, value: dataUser} = userCreateSchema.validate(req.body); 
    if (error) return res.status(400).json({status: "error", message: error.message});

    const {status, message } = await UserUsecase.insertUser(req, dataUser);
    if (status) return res.status(200).json({status: "success", message: message})
        else return res.status(500).json({status: "error", message: message})
}

const findUser = async (req, res) => {
    const dataNumber = req.param.dataNumber;
    const type = req.param.type;
    const {status, message } = await UserUsecase.findOne(req, {dataNumber, type});
    if (status) return res.status(200).json({status: "success", message: message})
        else return res.status(500).json({status: "error", message: message})
}

const generateAuth = async (req, res) => {
    const {error, value} = userLoginSchema.validate(req.body);
    if (error) return res.status(400).json({status: "error", message: error.message});
    const {status, message } = await UserUsecase.findByEmail(value.emailAddress);
    if (status) {
        const token = await generateToken(message);
        return res.status(200).json({status: "success", token: token});
    } else return res.status(500).json({status: "error", message: message})
}


module.exports = {
    createUser,
    findUser,
    generateAuth
}