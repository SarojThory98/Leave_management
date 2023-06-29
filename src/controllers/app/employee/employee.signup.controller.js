const {user} = require("../../../models/user/user.model");
const {USER_KEYS} = require("../../../constants/models/employee/employee.model.key");
const response = require("../../../utils/api/api-response-handler.utils");
const joiSignupSchema = require("../../../validation/app/employee/signup.validation");
const {commonConstants} = require("../../../constants/common/common.keys");
const {API_MESSAGE} = require("../../../messages/api/api-res.messages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerEmployee = async (req, res) => {
	try {
		let {name, email, password} = req.body;

		// joi validation
		const result = joiSignupSchema.employeeSignupSchema.validate(req.body);
		if (result.error) {
			return response.error(res, result.error.details);
		}

		// Create a new user
		const hashedPassword = await bcrypt.hash(password, 10);
		const newEmployeeObj = {
			[USER_KEYS.NAME]: name,
			[USER_KEYS.EMAIL]: email,
			[USER_KEYS.PASSWORD]: hashedPassword,
		};
		const newEmployee = new user(newEmployeeObj);

		// email validation
		const userExist = await user.findOne({[USER_KEYS.EMAIL]: email});
		if (userExist) {
			return response.error(res, API_MESSAGE.SIGNUP.USER_ALREADY_EXIST);
		}

		// Save the user to the database
		const {SECRET_KEY} = commonConstants;
		let token = jwt.sign({userExist}, SECRET_KEY, {expiresIn: commonConstants.JWT_EXPIRY});
		await newEmployee.save().then(() => {
			return response.success(res, API_MESSAGE.SIGNUP.SIGNUP_SUCCESS, {token: token});
		});
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	registerEmployee,
};
