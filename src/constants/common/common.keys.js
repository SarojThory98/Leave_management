const process = require("process");
require("dotenv").config();
const {MONGODB_URI, PORT, SECRET_KEY, JWT_EXPIRY} = process.env;
const commonConstants = {
	MONGODB_URI,
	PORT,
	SECRET_KEY,
	JWT_EXPIRY,
};
module.exports = {
	commonConstants,
};
