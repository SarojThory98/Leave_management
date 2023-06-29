const response = require("../../../utils/api/api-response-handler.utils");
const bcrypt = require("bcrypt");
const joiSignupUpdateSchema = require("../../../validation/app/common/updateUserInformation.validation");
const {user} = require("../../../models/user/user.model");
const {Types} = require("mongoose");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {USER_KEYS} = require("../../../constants/models/employee/employee.model.key");
const {COMMON_MODEL_KEYS} = require("../../../constants/models/common/common.model.key");

const updateUserInformation = async (req, res) => {
	try {
		let {name, password} = req.body;

		// joi validation
		const result = joiSignupUpdateSchema.userSignupSchema.validate(req.body);
		if (result.error) {
			return response.error(res, result.error.details);
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const updatedRegistation = await user.findOneAndUpdate(
			{[COMMON_MODEL_KEYS.ID]: new Types.ObjectId(req.userId.user._id)},
			{
				[USER_KEYS.NAME]: name,
				[USER_KEYS.PASSWORD]: hashedPassword,
			},
			{new: true},
		);

		if (!updatedRegistation) {
			return response.error(res, API_MESSAGE.UPDATE_USER_INFORMATION.UPDATION_ERROR);
		}
		return response.success(res, API_MESSAGE.UPDATE_USER_INFORMATION.UPDATION_SUCCESS);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	updateUserInformation,
};
