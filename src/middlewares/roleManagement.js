const {User} = require("../models/user/user.model");
const {USER_KEYS} = require("../constants/models/employee/employee.model.key");
const response = require("../utils/api/api-response-handler.utils");
const {API_MESSAGE} = require("../messages/api/api-res.messages");

const authUser = (premission) => {
	return async (req, res, next) => {
		const userEmail = req.body.email;
		const findUser = await User.findOne({[USER_KEYS.EMAIL]: userEmail});
		if (!findUser || premission.includes(findUser.type)) {
			next();
		} else {
			return response.error(res, API_MESSAGE.UNAUTHORIZED);
		}
	};
};

module.exports = {
	authUser,
};
