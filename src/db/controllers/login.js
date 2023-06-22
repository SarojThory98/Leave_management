const { User } = require("../models/User");
const { USER_KEYS } = require("../../constants/models/user");
const response = require("../../modules/response");
const joiSchema = require("../../middlewares/joiValidation");
const {commonConstants} = require("../../constants/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = async(req, res) => {
	try {
		let { email, password} = req.body;

		// Create a new user
		const loginUserObj = {
			[USER_KEYS.EMAIL]: email,
			[USER_KEYS.PASSWORD]: password
		};

		// joi validation
		const result = await joiSchema.loginUserSchema.validate(loginUserObj);
		if (result.error) {
			return response.error(res, result.error.details);  
		}
		
		// check email and password to login
		const findUser= await User.findOne({[USER_KEYS.EMAIL]:email}, { [USER_KEYS.EMAIL]: 1, [USER_KEYS.PASSWORD]: 1 });
		if(!findUser){
			return response.error(res, "user doesn't exist ..Please login");
		}
		bcrypt.compare(password, findUser.password, (err, result) => {
			if (result) {
				const {SECRET_KEY} = commonConstants;
				let token = jwt.sign({ userID:findUser._id }, SECRET_KEY , {expiresIn:"600s"});
				return response.success(res, "user successfully login", [findUser, {token:token}]);
			} else {
				return response.error(res, "incorrect password");
			}
		});	
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	loginUser
};