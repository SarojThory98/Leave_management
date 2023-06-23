const express = require("express");
const employeeRouter = express.Router();
const signupController = require("../../controllers/app/employee/employee.signup.controller.js");
const loginEmployeeController = require("../../controllers/app/common/user.login.controller");

const {registerEmployee} = signupController;
const {loginUser} = loginEmployeeController;

employeeRouter.post("/employee/signup", registerEmployee);
employeeRouter.post("/employee/login", loginUser);

module.exports = employeeRouter;
