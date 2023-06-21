const { User } = require("../models/User");
const { USER_KEYS } = require("../../constants/models/user");
const response = require("../../modules/response");
const joiSchema = require("../../middlewares/joiValidation");
const {commonConstants} = require("../../constants/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async(req, res) => {
	try {
		let { name, email, password, type } = req.body;

		// Create a new user
		const hashedPassword = await bcrypt.hash(password, 10);
		const newEmployeeObj = {
			[USER_KEYS.NAME]: name,
			[USER_KEYS.EMAIL]: email,
			[USER_KEYS.PASSWORD]: hashedPassword,
			[USER_KEYS.TYPE]: type,
		};
		const newEmployee = new User(newEmployeeObj);

		// joi validation
		const result = await joiSchema.empSchema.validate(newEmployeeObj);
		if (result.error) {
			return response.error(res, result.error.details);  
		}

		// email validation
		const userExist = await User.findOne({[USER_KEYS.EMAIL]:email});
		if(userExist){
			return response.error(res, "Email already exist");
		}
		
		// Save the user to the database
		const {SECRET_KEY} = commonConstants;
		let token = jwt.sign({ userExist }, SECRET_KEY , {expiresIn:"600s"});
		await newEmployee.save()
			.then((savedUser) => {
				return response.success(res, "employee successfully signed in", [savedUser, {tkeon:token}]);
			});

		
	} catch (err) {
		return response.error(res, err.message);
	}
};

module.exports = {
	createUser
};
