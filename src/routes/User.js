const express = require("express");
const router = express.Router();
const empController = require("../db/controllers/users");
const loginController = require("../db/controllers/login");

// to create an employee
const {createUser} = empController;
router.post("/signupEmp", createUser);

// login employee, HR, management
const {loginUser} = loginController;
router.post("/loginUser", loginUser);

module.exports = router;