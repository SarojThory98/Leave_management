const cors = require("cors");

const corsMiddleware = cors({
	origin: "*",
	optionsSuccessStatus: 200,
});

module.exports = corsMiddleware;
