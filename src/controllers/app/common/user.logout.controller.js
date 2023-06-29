const jwt = require("jsonwebtoken");
const {commonConstants} = require("../../../constants/common/common.keys");
const {SECRET_KEY} = commonConstants;
const response = require("../../../utils/api/api-response-handler.utils");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");

const logoutUser = async (req, res) => {
	try {
		let token = jwt.sign({user: req.userId.user._id}, SECRET_KEY, {expiresIn: 0});
		if (token) {
			return response.success(res, API_MESSAGE.LOGOUT.LOGOUT_SUCCESS, {token: token});
		}
		return response.error(res, API_MESSAGE.LOGOUT.LOGOUT_ERROR);
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	logoutUser,
};
