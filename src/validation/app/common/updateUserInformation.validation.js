const Joi = require("joi");
const {USER_KEYS} = require("../../../constants/models/employee/employee.model.key");

// registration update joi schema
const userSignupSchema = Joi.object().keys({
	[USER_KEYS.NAME]: Joi.string().min(3).max(30).required(),
	[USER_KEYS.PASSWORD]: Joi.string().min(6).required(),
});

module.exports = {
	userSignupSchema,
};
