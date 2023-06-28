const Joi = require("joi");
const {LEAVE_REQUEST_KEYS} = require("../../../constants/models/common/leaveRequest.model.key");

// login joi schema
const leaveRequestValidation = Joi.object().keys({
	[LEAVE_REQUEST_KEYS.START_DATE_TIME]: Joi.date().iso().required(),
	[LEAVE_REQUEST_KEYS.END_DATE_TIME]: Joi.date().iso().required(),
	[LEAVE_REQUEST_KEYS.COMMENT]: Joi.string().min(3).required(),
});

module.exports = {
	leaveRequestValidation,
};
