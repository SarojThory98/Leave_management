const {connectToMongoDb} = require("./src/config/db.config.connection");
const express = require("express");
const corsMiddleware = require("./src/middlewares/corsMiddleware");
const routes = require("./src/routes/index.route");
const {commonConstants} = require("./src/constants/common/common.keys");
const app = express();
app.use(express.json());

// connection to mongodb
connectToMongoDb();

// Apply the CORS middleware
app.use(corsMiddleware);

// api routing
routes(app);

app.listen(commonConstants.PORT, () => {
	console.log(`Server is running on PORT ${commonConstants.PORT}`);
});
