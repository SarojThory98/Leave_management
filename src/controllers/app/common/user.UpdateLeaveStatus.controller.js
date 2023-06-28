const response = require("../../../utils/api/api-response-handler.utils");
const joiLeaveStatusValid = require("../../../validation/app/common/updateLeaveStatus.validation");
const {Leave_Request} = require("../../../models/leave_request/index.leave_request.model");
const {Types} = require("mongoose");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {LEAVE_REQUEST_KEYS} = require("../../../constants/models/common/leaveRequest.model.key");
const {Leave_Bank} = require("../../../models/leave_bank/index.leave_bank.model");
const {LEAVE_BANK_KEYS} = require("../../../constants/models/common/leaveBank.model.key");
const {LEAVE_REQUEST_STATUS_ENUM} = require("../../../constants/models/Enums/leaveRequest.emuns");

const updateLeaveStatus = async (req, res) => {
	try {
		const {status} = req.body;
		const userID = req.params.id;
		// Joi validation
		const result = joiLeaveStatusValid.leaveStatusSchema.validate(req.body);
		if (result.error) {
			return response.error(res, result.error.details);
		}

		const updatedLeaveRequest = await Leave_Request.findOneAndUpdate({[LEAVE_REQUEST_KEYS.USER_ID]: new Types.ObjectId(userID)}, {[LEAVE_REQUEST_KEYS.STATUS]: status}, {new: true});

		if (!updatedLeaveRequest) {
			return response.error(res, API_MESSAGE.UPDATE_LEAVE_STATUS.UPDATE_LEAVE_STATUS_ERROR);
		}
		const startDate = new Date(updatedLeaveRequest.startDateTime);
		const endDate = new Date(updatedLeaveRequest.endDateTime);
		const timeDiff = endDate - startDate;
		const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

		if (status == LEAVE_REQUEST_STATUS_ENUM.APPROVE) {
			await Leave_Bank.findOneAndUpdate({[LEAVE_BANK_KEYS.USER_ID]: new Types.ObjectId(userID)}, {[LEAVE_BANK_KEYS.LEAVE_QUANTITY]: days}, {new: true});
		}
		return response.success(res, days);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	updateLeaveStatus,
};
