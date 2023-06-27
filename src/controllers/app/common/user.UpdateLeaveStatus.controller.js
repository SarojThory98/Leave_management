const response = require("../../../utils/api/api-response-handler.utils");
const joiLeaveStatusValid = require("../../../validation/app/common/updateLeaveStatus.validation");
const {Leave_Request} = require("../../../models/leave_request/index.leave_request.model");
const {Types} = require("mongoose");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {LEAVE_REQUEST_KEYS} = require("../../../constants/models/common/leaveRequest.model.key");

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

		return response.success(res, API_MESSAGE.UPDATE_LEAVE_STATUS.UPDATE_LEAVE_STATUS_SUCCESS);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	updateLeaveStatus,
};
