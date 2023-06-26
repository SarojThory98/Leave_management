const {Types} = require("mongoose");
const response = require("../../../utils/api/api-response-handler.utils");
const {Leave_Request} = require("../../../models/leave_request/index.leave_request.model");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {COMMON_MODEL_KEYS} = require("../../../constants/models/common/common.model.key");

const hrLeaveList = async (req, res) => {
	try {
		const leaveRequestList = await Leave_Request.find({[COMMON_MODEL_KEYS.USER_ID]: new Types.ObjectId("64953ed224c0bbc90fc098f7")});
		if (leaveRequestList) {
			return response.success(res, API_MESSAGE.LEAVE_REQUEST.PAST_LEAVE_SUCCESS, leaveRequestList);
		}
		return response.error(res, API_MESSAGE.LEAVE_REQUEST.NO_LEAVE_REQUEST);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	hrLeaveList,
};
