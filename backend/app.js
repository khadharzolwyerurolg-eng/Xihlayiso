const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: ["https://xihlayisos.onrender.com", "https://xihlayisos.onrender.com"],
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
