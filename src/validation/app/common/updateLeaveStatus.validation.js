const Joi = require("joi");
const {LEAVE_REQUEST_KEYS} = require("../../../constants/models/common/leaveRequest.model.key");
const {LEAVE_REQUEST_STATUS_ENUM} = require("../../../constants/models/Enums/leaveRequest.emuns");

// login joi schema
const leaveStatusSchema = Joi.object().keys({
	[LEAVE_REQUEST_KEYS.STATUS]: Joi.string().valid(LEAVE_REQUEST_STATUS_ENUM.PENDING, LEAVE_REQUEST_STATUS_ENUM.APPROVE, LEAVE_REQUEST_STATUS_ENUM.REJECT).required(),
});

module.exports = {
	leaveStatusSchema,
};
