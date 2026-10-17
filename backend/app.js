const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
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
