const process = require("process");
require("dotenv").config();
const {MONGODB_URI, PORT, SECRET_KEY, JWT_EXPIRY, BCRYPT_SALT_ROUNDS} = process.env;
const commonConstants = {
	MONGODB_URI,
	PORT,
	SECRET_KEY,
	JWT_EXPIRY,
	BCRYPT_SALT_ROUNDS,
};
module.exports = {
	commonConstants,
};
