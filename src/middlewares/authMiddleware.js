const {user} = require("../models/user/user.model");
const {commonConstants} = require("../constants/common/common.keys");
const {SECRET_KEY} = commonConstants;
const response = require("../utils/api/api-response-handler.utils");
const {USER_KEYS} = require("../constants/models/employee/employee.model.key");
const jwt = require("jsonwebtoken");
const {API_MESSAGE} = require("../messages/api/api-res.messages");

const verifyToken = (permission) => {
	return async (req, res, next) => {
		const token = req.headers["token"];

		if (!token) {
			return response.error(res, API_MESSAGE.NOT_EXIST_TOKEN);
		}
		try {
			const decodedToken = jwt.verify(token, SECRET_KEY);
			const userEmail = decodedToken.user.email;

			// Store the email in the request object for future use
			req.userId = decodedToken;

			const userDetail = await user.findOne({[USER_KEYS.EMAIL]: userEmail});

			if (permission.includes(userDetail.type)) {
				next();
			} else {
				return response.error(res, API_MESSAGE.UNAUTHORIZED);
			}
		} catch (err) {
			return response.error(res, err.message);
		}
	};
};

module.exports = {
	verifyToken,
};
