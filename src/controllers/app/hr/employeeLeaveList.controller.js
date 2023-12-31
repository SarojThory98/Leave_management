const response = require("../../../utils/api/api-response-handler.utils");
const {leaveRequest} = require("../../../models/leave_request/index.leave_request.model");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");

const employeeLeaveList = async (req, res) => {
	try {
		const leaveRequestList = await leaveRequest.find({});
		if (leaveRequestList && leaveRequestList.length) {
			return response.success(res, API_MESSAGE.LEAVE_REQUEST.PAST_LEAVE_SUCCESS, leaveRequestList);
		}
		return response.error(res, API_MESSAGE.LEAVE_REQUEST.NO_LEAVE_REQUEST);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	employeeLeaveList,
};
