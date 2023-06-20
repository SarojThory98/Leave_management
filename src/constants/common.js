const process = require("process");
require("dotenv").config();
const{
	MONGODB_URI,
	PORT
} = process.env;
const commonConstants = {
	MONGODB_URI,
	PORT
};
module.exports = {
	commonConstants
};
