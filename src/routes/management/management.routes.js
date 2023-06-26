const express = require("express");
const managementRouter = express.Router();

const loginHrController = require("../../controllers/app/common/user.login.controller");
const {loginUser} = loginHrController;
const {authUser} = require("../../middlewares/roleManagement");
const {USER_TYPE_ENUM} = require("../../constants/models/Enums/signUpEnums");
const hrLeaveListController = require("../../controllers/app/management/hrLeaveList.controller");
const {hrLeaveList} = hrLeaveListController;
const userAuth = require("../../middlewares/authMiddleware");
const {verifyToken} = userAuth;
const allEmployeeList = require("../../controllers/app/common/user.employeeList.controller");
const {employeeList} = allEmployeeList;

managementRouter.post("/management/login", authUser([USER_TYPE_ENUM.MANAGEMENT]), loginUser);
managementRouter.get("/management/leave-request-list", verifyToken([USER_TYPE_ENUM.MANAGEMENT]), hrLeaveList);
managementRouter.get("/management/employee-list", verifyToken([USER_TYPE_ENUM.MANAGEMENT]), employeeList);

module.exports = managementRouter;
