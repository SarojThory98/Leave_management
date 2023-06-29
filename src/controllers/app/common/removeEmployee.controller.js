const {Types} = require("mongoose");
const response = require("../../../utils/api/api-response-handler.utils");
const {user} = require("../../../models/user/user.model");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {COMMON_MODEL_KEYS} = require("../../../constants/models/common/common.model.key");
const removeEmployee = async (req, res) => {
	try {
		const result = await user.findOneAndDelete({[COMMON_MODEL_KEYS.ID]: new Types.ObjectId(req.params.id)});

		if (result) {
			return response.success(res, API_MESSAGE.SIGNUP.REMOVE_USER_SUCCESS);
		}
		return response.error(res, API_MESSAGE.SIGNUP.REMOVE_USER_ERROR);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	removeEmployee,
};
