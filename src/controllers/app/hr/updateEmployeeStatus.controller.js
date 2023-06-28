const response = require("../../../utils/api/api-response-handler.utils");
const joiEmployeeStatusValid = require("../../../validation/app/hr/employeeSignupStatus.validation");
const {User} = require("../../../models/user/user.model");
const {Types} = require("mongoose");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {EMPLOYEE_SIGNUP_STATUS} = require("../../../constants/models/Enums/signUpEnums");
const {LEAVE_BANK_KEYS} = require("../../../constants/models/common/leaveBank.model.key");
const {Leave_Bank} = require("../../../models/leave_bank/index.leave_bank.model");
let leave_bank_response = "";

const updateEmployeeStatus = async (req, res) => {
	try {
		const {status} = req.body;
		const userID = req.params.id;

		// Joi validation
		const result = joiEmployeeStatusValid.employeeStatusValidation.validate(req.body);
		if (result.error) {
			return response.error(res, result.error.details);
		}

		const updatedStatus = await User.findOneAndUpdate({_id: new Types.ObjectId(userID)}, {status: status}, {new: true});

		if (!updatedStatus) {
			return response.error(res, API_MESSAGE.UPDATE_EMPLOYEE_STATUS.UPDATE_STATUS_ERROR);
		}

		// if userid already exist
		const userLeaveBankDetail = await Leave_Bank.findOne({[LEAVE_BANK_KEYS.USER_ID]: new Types.ObjectId(userID)});

		// change leave bank id status is approved
		if (!userLeaveBankDetail) {
			if (updatedStatus.status == EMPLOYEE_SIGNUP_STATUS.APPROVE) {
				const userLeaveBank = {
					[LEAVE_BANK_KEYS.USER_ID]: new Types.ObjectId(userID),
					[LEAVE_BANK_KEYS.LEAVE_QUANTITY]: 2,
				};
				const newLeaveBank = new Leave_Bank(userLeaveBank);
				await newLeaveBank.save();
				leave_bank_response = API_MESSAGE.LEAVE_BANK.LEAVE_BANK_ADD_SUCCESS;
			} else {
				leave_bank_response = API_MESSAGE.LEAVE_BANK.NO_RESPONSE;
			}
		} else {
			if (updatedStatus.status != EMPLOYEE_SIGNUP_STATUS.APPROVE) {
				await Leave_Bank.deleteMany({[LEAVE_BANK_KEYS.USER_ID]: new Types.ObjectId(userID)});
				leave_bank_response = API_MESSAGE.LEAVE_BANK.LEAVE_BANK_DELETE;
			} else {
				leave_bank_response = API_MESSAGE.LEAVE_BANK.LEAVE_BANK_EXIST;
			}
		}

		return response.success(res, {userStatus: API_MESSAGE.UPDATE_EMPLOYEE_STATUS.UPDATE_STATUS_SUCCESSS, leaveBank: leave_bank_response});
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	updateEmployeeStatus,
};
