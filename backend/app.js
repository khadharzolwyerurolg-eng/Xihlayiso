const express = require('express');
const cors = require('cors');

const app = express();
const allowedOrigins = (
    process.env.CLIENT_URLS ||
    process.env.CLIENT_URL ||
    "https://xihlayisos.onrender.com,http://localhost:3000"
).split(",").map((origin) => origin.trim()).filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

/**
 * @constant
 */
const biographyRoute = require('./routes/biography')



app.use(express.json());



/**
 * @routes
 */
app.use("/api/biography", biographyRoute)


module.exports = app;
