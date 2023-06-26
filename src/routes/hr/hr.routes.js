const express = require("express");
const hrRouter = express.Router();
const loginHrController = require("../../controllers/app/common/user.login.controller");
const {authUser} = require("../../middlewares/roleManagement");
const {loginUser} = loginHrController;
const {USER_TYPE_ENUM} = require("../../constants/models/Enums/signUpEnums");
const leaveRequestController = require("../../controllers/app/common/user.leaveRequest.controller");
const {userLeaveRequest} = leaveRequestController;
const userAuth = require("../../middlewares/authMiddleware");
const {verifyToken} = userAuth;
const employeeLeaveListController = require("../../controllers/app/hr/employeeLeaveList.controller");
const {employeeLeaveList} = employeeLeaveListController;
const allEmployeeList = require("../../controllers/app/common/user.employeeList.controller");
const {employeeList} = allEmployeeList;

hrRouter.post("/hr/login", authUser([USER_TYPE_ENUM.HR]), loginUser);
hrRouter.post("/hr/leave-request", verifyToken([USER_TYPE_ENUM.HR]), userLeaveRequest);
hrRouter.get("/hr/leave-request-list", verifyToken([USER_TYPE_ENUM.HR]), employeeLeaveList);
hrRouter.get("/hr/employee-list", verifyToken([USER_TYPE_ENUM.HR]), employeeList);

module.exports = hrRouter;
