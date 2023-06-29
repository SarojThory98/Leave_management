const {user} = require("../models/user/user.model");
const {USER_KEYS} = require("../constants/models/employee/employee.model.key");
const response = require("../utils/api/api-response-handler.utils");
const {API_MESSAGE} = require("../messages/api/api-res.messages");
const {Types} = require("mongoose");

// middleware for role management
const authUser = (premission) => {
	return async (req, res, next) => {
		const findUser = await user.findOne({[USER_KEYS.EMAIL]: req.body.email});
		if (!findUser || premission.includes(findUser.type)) {
			next();
		} else {
			return response.error(res, API_MESSAGE.UNAUTHORIZED);
		}
	};
};

// middleware for update leave status
const leaveStatus = (permission) => {
	return async (req, res, next) => {
		const userID = req.params.id;
		const userDetail = await user.findOne({_id: new Types.ObjectId(userID)});
		if (!userDetail || permission.includes(userDetail.type)) {
			next();
		} else {
			return response.error(res, API_MESSAGE.UNAUTHORIZED);
		}
	};
};

module.exports = {
	authUser,
	leaveStatus,
};
