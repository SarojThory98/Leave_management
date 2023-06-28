const {Types} = require("mongoose");
const response = require("../../../utils/api/api-response-handler.utils");
// const joiPublicHolidaySchema = require("../../../validation/app/hr/publicHoliday.validation");
const {User} = require("../../../models/user/user.model");
// const {PUBLIC_HOLIDAY_KEYS} = require("../../../constants/models/hr/publicHoliday.model.key");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");

const removeEmployee = async (req, res) => {
	try {
		const _id = req.params.id;

		const removedEmployee = await User.deleteOne({_id: new Types.ObjectId(_id)});

		if (!removedEmployee) {
			return response.error(res, API_MESSAGE.SIGNUP.REMOVE_USER_ERROR);
		}

		return response.success(res, API_MESSAGE.SIGNUP.REMOVE_USER_SUCCESS);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	removeEmployee,
};
