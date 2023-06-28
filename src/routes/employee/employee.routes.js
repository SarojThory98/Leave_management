const express = require("express");
const employeeRouter = express.Router();
const signupController = require("../../controllers/app/employee/employee.signup.controller.js");
const loginEmployeeController = require("../../controllers/app/common/user.login.controller");
const leaveRequestController = require("../../controllers/app/common/user.leaveRequest.controller");
const leaveListController = require("../../controllers/app/employee/employee.leaveList.controller");
const {authUser} = require("../../middlewares/roleManagement");
const {USER_TYPE_ENUM} = require("../../constants/models/Enums/signUpEnums");
const userAuth = require("../../middlewares/authMiddleware");
const {verifyToken} = userAuth;
const holidayListController = require("../../controllers/app/common/publicHolidayList.controller");
const {holidayList} = holidayListController;

const {registerEmployee} = signupController;
const {loginUser} = loginEmployeeController;
const {userLeaveRequest} = leaveRequestController;
const {leaveRequestList} = leaveListController;

employeeRouter.post("/employee/signup", authUser([USER_TYPE_ENUM.EMPLOYEE]), registerEmployee);
employeeRouter.post("/employee/login", authUser([USER_TYPE_ENUM.EMPLOYEE]), loginUser);
employeeRouter.post("/employee/leave-request", verifyToken([USER_TYPE_ENUM.EMPLOYEE]), userLeaveRequest);
employeeRouter.get("/employee/leave-request-list", verifyToken([USER_TYPE_ENUM.EMPLOYEE]), leaveRequestList);
employeeRouter.get("/employee/public-holiday-list", verifyToken([USER_TYPE_ENUM.EMPLOYEE]), holidayList);

module.exports = employeeRouter;
