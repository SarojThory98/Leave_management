const {Types} = require("mongoose");
const response = require("../../../utils/api/api-response-handler.utils");
// const joiPublicHolidaySchema = require("../../../validation/app/hr/publicHoliday.validation");
const {Public_Holiday} = require("../../../models/public_holiday/index.public_holiday.model");
const {PUBLIC_HOLIDAY_KEYS} = require("../../../constants/models/hr/publicHoliday.model.key");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");

const deletePublicHoliday = async (req, res) => {
	try {
		const _id = req.params.id;

		const deletedHoliday = await Public_Holiday.deleteOne({[PUBLIC_HOLIDAY_KEYS.ID]: new Types.ObjectId(_id)});

		if (!deletedHoliday) {
			return response.error(res, API_MESSAGE.PUBLIC_HOLIDAY.DELETE_ERROR);
		}

		return response.success(res, API_MESSAGE.PUBLIC_HOLIDAY.DELETE_SUCCESS);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	deletePublicHoliday,
};
