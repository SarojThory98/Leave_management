const { connectToMongoDb } = require("./src/db");
const express = require("express");
const corsMiddleware = require("./src/middlewares/corsMiddleware");
const routes = require("./src/routes/User");
const app = express();
app.use(express.json());

// connection to mongodb
connectToMongoDb();

// Apply the CORS middleware
app.use(corsMiddleware);

// routes for all api
app.use("/api", routes);

app.listen(5000, () => {
	console.log("Server is running on PORT 5000");
});
