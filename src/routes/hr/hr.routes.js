const express = require("express");
const hrRouter = express.Router();

const loginHrController = require("../../controllers/app/common/user.login.controller");
const {loginUser} = loginHrController;

hrRouter.post("/hr/login", loginUser);

module.exports = hrRouter;
