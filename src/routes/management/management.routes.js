const express = require("express");
const managementRouter = express.Router();

const loginHrController = require("../../controllers/app/common/user.login.controller");
const {loginUser} = loginHrController;
const {authUser} = require("../../middlewares/roleManagement");
const {USER_TYPE_ENUM} = require("../../constants/models/Enums/signUpEnums");

managementRouter.post("/management/login", authUser([USER_TYPE_ENUM.MANAGEMENT]), loginUser);

module.exports = managementRouter;
