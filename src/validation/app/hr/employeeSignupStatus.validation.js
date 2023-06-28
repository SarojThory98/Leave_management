const Joi = require("joi");
const {USER_KEYS} = require("../../../constants/models/employee/employee.model.key");
const {EMPLOYEE_SIGNUP_STATUS} = require("../../../constants/models/Enums/signUpEnums");

//  joi schema
const employeeStatusValidation = Joi.object().keys({
	[USER_KEYS.STATUS]: Joi.number().valid(EMPLOYEE_SIGNUP_STATUS.PENDING, EMPLOYEE_SIGNUP_STATUS.APPROVE, EMPLOYEE_SIGNUP_STATUS.REJECT).required(),
});

module.exports = {
	employeeStatusValidation,
};
