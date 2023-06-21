const Joi = require("joi");
const { USER_KEYS } = require("../constants/models/user");

// registration joi schema
const empSchema = Joi.object().keys({
	[USER_KEYS.NAME]: Joi.string().alphanum().min(3).max(30).required(),
	[USER_KEYS.EMAIL]: Joi.string().min(3).required().email(),
	[USER_KEYS.PASSWORD]: Joi.string().min(3).required(),
	[USER_KEYS.TYPE]: Joi.number().valid(0, 1, 2).required()
});

// login joi schema
const loginUserSchema = Joi.object().keys({
	[USER_KEYS.EMAIL]: Joi.string().min(3).required().email(),
	[USER_KEYS.PASSWORD]: Joi.string().min(3).required(),
});
module.exports = {
	empSchema,
	loginUserSchema
};

          