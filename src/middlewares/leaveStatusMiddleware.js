const {User} = require("../models/user/user.model");
const response = require("../utils/api/api-response-handler.utils");
const {API_MESSAGE} = require("../messages/api/api-res.messages");
const {Types} = require("mongoose");

const leaveStatus = (permission) => {
	return async (req, res, next) => {
		const userID = req.body.userID;
		const user = await User.findOne({_id: new Types.ObjectId(userID)});
		if (!user || permission.includes(user.type)) {
			next();
		} else {
			return response.error(res, API_MESSAGE.UNAUTHORIZED);
		}
	};
};

module.exports = {
	leaveStatus,
};
