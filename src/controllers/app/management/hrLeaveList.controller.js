const {Types} = require("mongoose");
const {user} = require("../../../models/user/user.model");
const response = require("../../../utils/api/api-response-handler.utils");
const {leaveRequest} = require("../../../models/leave_request/index.leave_request.model");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {COMMON_MODEL_KEYS} = require("../../../constants/models/common/common.model.key");
const {USER_KEYS} = require("../../../constants/models/employee/employee.model.key");
const {USER_TYPE_ENUM} = require("../../../constants/models/Enums/signUpEnums");

const hrLeaveList = async (req, res) => {
	try {
		const HrDetails = await user.findOne({[USER_KEYS.TYPE]: USER_TYPE_ENUM.HR});
		const leaveRequestList = await leaveRequest.find({[COMMON_MODEL_KEYS.USER_ID]: new Types.ObjectId(HrDetails._id)});
		if (leaveRequestList && leaveRequestList.length) {
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
