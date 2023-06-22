const express = require("express");
const managementRouter = express.Router();

const loginHrController = require("../../controllers/app/common/user.login.controller");
const {loginUser} = loginHrController;

managementRouter.post("/management/login", loginUser);

module.exports = managementRouter;
