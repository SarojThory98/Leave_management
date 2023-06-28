const response = require("../../../utils/api/api-response-handler.utils");
const {Public_Holiday} = require("../../../models/public_holiday/index.public_holiday.model");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
// const {USER_KEYS} = require("../../../constants/models/employee/employee.model.key");
// const {USER_TYPE_ENUM} = require("../../../constants/models/Enums/signUpEnums");

const holidayList = async (req, res) => {
	try {
		const allHolidayList = await Public_Holiday.find({});
		if (allHolidayList && allHolidayList.length) {
			return response.success(res, API_MESSAGE.PUBLIC_HOLIDAY.GET_PUBLIC_HOLIDAY_SUCCESS, allHolidayList);
		}
		return response.error(res, API_MESSAGE.PUBLIC_HOLIDAY.GET_PUBLIC_HOLIDAY_ERROR);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	holidayList,
};
