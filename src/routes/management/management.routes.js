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
const hrLeaveStatuscontroller = require("../../controllers/app/common/user.UpdateLeaveStatus.controller");
const {updateLeaveStatus} = hrLeaveStatuscontroller;
const leaveRequestStatus = require("../../middlewares/leaveStatusMiddleware");
const {leaveStatus} = leaveRequestStatus;
const holidayListController = require("../../controllers/app/common/publicHolidayList.controller");
const {holidayList} = holidayListController;
const removeEmployeeController = require("../../controllers/app/common/removeEmployee.controller");
const {removeEmployee} = removeEmployeeController;

managementRouter.post("/management/login", authUser([USER_TYPE_ENUM.MANAGEMENT]), loginUser);
managementRouter.get("/management/leave-request-list", verifyToken([USER_TYPE_ENUM.MANAGEMENT]), hrLeaveList);
managementRouter.get("/management/employee-list", verifyToken([USER_TYPE_ENUM.MANAGEMENT]), employeeList);
managementRouter.patch("/management/update-employee-leave-status/:id", [verifyToken([USER_TYPE_ENUM.MANAGEMENT]), leaveStatus([USER_TYPE_ENUM.HR])], updateLeaveStatus);
managementRouter.get("/management/public-holiday-list", verifyToken([USER_TYPE_ENUM.MANAGEMENT]), holidayList);
managementRouter.delete("/management/remove-employee/:id", verifyToken([USER_TYPE_ENUM.MANAGEMENT]), removeEmployee);

module.exports = managementRouter;
