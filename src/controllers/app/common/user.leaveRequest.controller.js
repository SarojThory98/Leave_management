const {Types} = require("mongoose");
const {Leave_Request} = require("../../../models/leave_request/index.leave_request.model");
const response = require("../../../utils/api/api-response-handler.utils");
const {leaveRequestValidation} = require("../../../validation/app/common/leave_request.validation");
const {LEAVE_REQUEST_KEYS, LEAVE_LIMIT} = require("../../../constants/models/common/leaveRequest.model.key");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {Public_Holiday} = require("../../../models/public_holiday/index.public_holiday.model");
const {Leave_Bank} = require("../../../models/leave_bank/index.leave_bank.model");
const {LEAVE_BANK_KEYS} = require("../../../constants/models/common/leaveBank.model.key");
// const { addDays, isWeekend} = require("date-fns");

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
		const holidays = await Public_Holiday.find({}).lean();

		let currentDate = new Date(startDateTime); // Set the current date
		let targetDate = new Date(endDateTime); // Set the target date

		let LeaveDays = 0;

		while (currentDate <= targetDate) {
			const formattedDate = currentDate.toISOString().split("T")[0]; // Format currentDate

			const isWeekend = (date) => {
				const day = date.getDay();
				return day === 0 || day === 6;
			};

			const dateExists = holidays.some((holiday) => {
				const formattedHolidayDate = holiday.holiday_date.toISOString().split("T")[0];
				return formattedHolidayDate === formattedDate;
			});

			if (!isWeekend(currentDate) && !dateExists) {
				LeaveDays++;
			}

			currentDate.setDate(currentDate.getDate() + 1);
		}

		if (LeaveDays > LEAVE_LIMIT) {
			return response.error(res, API_MESSAGE.LEAVE_REQUEST.EXCEEDED_LEAVE_LIMIT);
		}

		const userLeaveBank = await Leave_Bank.findOne({[LEAVE_BANK_KEYS.USER_ID]: new Types.ObjectId(req.userId.user._id)});
		if (userLeaveBank.leave_quantity < LeaveDays) {
			return response.error(res, API_MESSAGE.LEAVE_REQUEST.EXCEEDED_LEAVE_BANK_LIMIT);
		}

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
