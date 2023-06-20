const mongoose = require("mongoose");
const {commonConstants} = require("../constants/index");
const { MONGODB_URI } = commonConstants;
const connectToMongoDb = () => {
	mongoose.connect(MONGODB_URI, {   
		useNewUrlParser: true, 
		useUnifiedTopology: true 
	});
	mongoose.connection.on("connected", () => {
		console.log("MongoDb connected on port 27017 \n");
	});
	mongoose.connection.on("error", (err) => {
		console.log(`An error occurred. ERROR: ${err} \n`);
	});
	mongoose.connection.on("disconnected", () => {
		console.log("MongoDb disconnected! \n");
	});
};

module.exports = {
	connectToMongoDb
};

