const process = require("process");
require("dotenv").config();
const{
	MONGODB_URI,
	PORT,
	SECRET_KEY
} = process.env;
const commonConstants = {
	MONGODB_URI,
	PORT,
	SECRET_KEY
};
module.exports = {
	commonConstants
};
