const {Types} = require("mongoose");
const {Leave_Request} = require("../../../models/leave_request/index.leave_request.model");
const response = require("../../../utils/api/api-response-handler.utils");
const {leaveRequestValidation} = require("../../../validation/app/common/leave_request.validation");
const {LEAVE_REQUEST_KEYS} = require("../../../constants/models/common/leaveRequest.model.key");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");

const userLeaveRequest = async (req, res) => {
	try {
		// joi validation
		const result = leaveRequestValidation.validate(req.body);
		if (result.error) {
			return response.error(res, result.error.details);
		}

		const userLeaveRequest = await Leave_Request.findOne({$and: [{[LEAVE_REQUEST_KEYS.USER_ID]: new Types.ObjectId(req.userId.user._id)}, {[LEAVE_REQUEST_KEYS.STATUS]: 0}]});
		if (userLeaveRequest) {
			return response.error(res, API_MESSAGE.LEAVE_REQUEST.PENDING_REQUEST);
		}
		let {startDateTime, endDateTime, comment} = req.body;
		const leaveRequestObj = {
			[LEAVE_REQUEST_KEYS.USER_ID]: req.userId.user._id,
			[LEAVE_REQUEST_KEYS.START_DATE_TIME]: startDateTime,
			[LEAVE_REQUEST_KEYS.END_DATE_TIME]: endDateTime,
			[LEAVE_REQUEST_KEYS.COMMENT]: comment,
		};
		const newLeaveRequest = new Leave_Request(leaveRequestObj);
		await newLeaveRequest.save().then(() => {
			return response.success(res, API_MESSAGE.LEAVE_REQUEST.LEAVE_SUCCESS);
		});
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	userLeaveRequest,
};
