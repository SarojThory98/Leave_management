const Joi = require("joi");
const {USER_KEYS} = require("../../../constants/models/employee/employee.model.key");

// login joi schema
const loginUserSchema = Joi.object().keys({
	[USER_KEYS.EMAIL]: Joi.string().min(3).required().email(),
	[USER_KEYS.PASSWORD]: Joi.string().min(3).required(),
});

module.exports = {
	loginUserSchema,
};
