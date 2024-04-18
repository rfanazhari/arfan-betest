const express = require('express')
const router = express.Router();
const userController = require("../controller/user.controller");
const middleware = require("../libs/middleware");

router.post("/login", userController.generateAuth);
router.post("/users/create", middleware.authenticateUser, userController.createUser);
router.get("/users/:dataNumber/:type", middleware.authenticateUser, userController.findUser);

module.exports = router;