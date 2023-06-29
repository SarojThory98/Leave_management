const {user} = require("../../../models/user/user.model");
const {USER_KEYS} = require("../../../constants/models/employee/employee.model.key");
const response = require("../../../utils/api/api-response-handler.utils");
const joiLoginSchema = require("../../../validation/app/common/login.validation");
const {commonConstants} = require("../../../constants/common/common.keys");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const {EMPLOYEE_SIGNUP_STATUS} = require("../../../constants/models/Enums/signUpEnums");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = async (req, res) => {
	try {
		let {email, password} = req.body;

		// joi validation
		const result = joiLoginSchema.loginUserSchema.validate(req.body);
		if (result.error) {
			return response.error(res, result.error.details);
		}

		// check email and password to login
		const userDetails = await user.findOne({[USER_KEYS.EMAIL]: email});
		if (!userDetails) {
			return response.error(res, API_MESSAGE.LOGIN.USER_NOT_EXISTS);
		}
		if (userDetails && userDetails.status != EMPLOYEE_SIGNUP_STATUS.APPROVE) {
			return response.error(res, API_MESSAGE.LOGIN.STATUS_NOT_APPROVED);
		}
		bcrypt.compare(password, userDetails.password, (err, result) => {
			if (result) {
				const {SECRET_KEY} = commonConstants;
				let token = jwt.sign({user: userDetails}, SECRET_KEY, {expiresIn: commonConstants.JWT_EXPIRY});
				return response.success(res, API_MESSAGE.LOGIN.LOGIN_SUCCESS, {token: token});
			}
			return response.error(res, API_MESSAGE.LOGIN.INVALID_PASSWORD);
		});
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	loginUser,
};
