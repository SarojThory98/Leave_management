const {Types} = require("mongoose");
const response = require("../../../utils/api/api-response-handler.utils");
// const joiPublicHolidaySchema = require("../../../validation/app/hr/publicHoliday.validation");
const {publicHoliday} = require("../../../models/public_holiday/index.public_holiday.model");
const {PUBLIC_HOLIDAY_KEYS} = require("../../../constants/models/hr/publicHoliday.model.key");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");

const deletePublicHoliday = async (req, res) => {
	try {
		const deletedHoliday = await publicHoliday.findOneAndDelete({[PUBLIC_HOLIDAY_KEYS.ID]: new Types.ObjectId(req.params.id)});

		if (deletedHoliday) {
			return response.success(res, API_MESSAGE.PUBLIC_HOLIDAY.DELETE_SUCCESS);
		}

		return response.error(res, API_MESSAGE.PUBLIC_HOLIDAY.DELETE_ERROR);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	deletePublicHoliday,
};
