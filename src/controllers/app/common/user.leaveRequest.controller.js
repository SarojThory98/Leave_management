const {Types} = require("mongoose");
const {leaveRequest} = require("../../../models/leave_request/index.leave_request.model");
const response = require("../../../utils/api/api-response-handler.utils");
const {leaveRequestValidation} = require("../../../validation/app/common/leave_request.validation");
const {LEAVE_REQUEST_KEYS} = require("../../../constants/models/common/leaveRequest.model.key");
const {commonConstants} = require("../../../constants/common/common.keys");
const {LEAVE_LIMIT} = commonConstants;
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {publicHoliday} = require("../../../models/public_holiday/index.public_holiday.model");
const {leaveBank} = require("../../../models/leave_bank/index.leave_bank.model");
const {COMMON_MODEL_KEYS} = require("../../../constants/models/common/common.model.key");

const userLeaveRequest = async (req, res) => {
	try {
		// joi validation
		const result = leaveRequestValidation.validate(req.body);
		if (result.error) {
			return response.error(res, result.error.details);
		}

		// if leave is already in pending state
		const userLeaveRequest = await leaveRequest.findOne({$and: [{[COMMON_MODEL_KEYS.USER_ID]: new Types.ObjectId(req.userId.user._id)}, {[LEAVE_REQUEST_KEYS.STATUS]: 0}]});
		if (userLeaveRequest) {
			return response.error(res, API_MESSAGE.LEAVE_REQUEST.PENDING_REQUEST);
		}

		// count leave days in start date and end date
		let {startDateTime, endDateTime, comment} = req.body;
		const holidays = await publicHoliday.find({});
		const formattedHolidays = holidays.map((h) => h.holiday_date.toISOString().split("T")[0]);
		const weekendDays = new Set([0, 6]);

		let currentDate = new Date(startDateTime);
		let targetDate = new Date(endDateTime);
		let leaveDays = 0;

		while (currentDate <= targetDate) {
			if (!weekendDays.has(currentDate.getDay()) && !formattedHolidays.includes(currentDate.toISOString().split("T")[0])) {
				leaveDays++;
			}

			currentDate.setDate(currentDate.getDate() + 1);
		}

		if (leaveDays > LEAVE_LIMIT) {
			return response.error(res, API_MESSAGE.LEAVE_REQUEST.EXCEEDED_LEAVE_LIMIT);
		}

		// check user leave bank sufficient or not
		const userLeaveBank = await leaveBank.findOne({[COMMON_MODEL_KEYS.USER_ID]: new Types.ObjectId(req.userId.user._id)});
		if (userLeaveBank.leave_quantity < leaveDays) {
			return response.error(res, API_MESSAGE.LEAVE_REQUEST.EXCEEDED_LEAVE_BANK_LIMIT);
		}

		// create new leave request
		const leaveRequestObj = {
			[COMMON_MODEL_KEYS.USER_ID]: req.userId.user._id,
			[LEAVE_REQUEST_KEYS.START_DATE_TIME]: startDateTime,
			[LEAVE_REQUEST_KEYS.END_DATE_TIME]: endDateTime,
			[LEAVE_REQUEST_KEYS.COMMENT]: comment,
		};
		const newLeaveRequest = new leaveRequest(leaveRequestObj);
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
