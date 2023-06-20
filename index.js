const { connectToMongoDb } = require("./src/db");
const express = require("express");
const corsMiddleware = require("./src/middlewares/corsMiddleware");
const app = express();

// Apply the CORS middleware
app.use(corsMiddleware);
connectToMongoDb();