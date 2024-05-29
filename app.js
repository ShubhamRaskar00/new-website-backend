// Import required modules
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error");


// List of allowed origins
const allowedOrigins = [
    'https://shubhamraskar.vercel.app',
    'https://shubhamraskar00.github.io',
];

const corsOptions = {
    origin: (origin, callback) => {
        // Check if the request's origin is in the allowed origins list
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Enable credentials
};

app.use(cors(corsOptions));

app.use(express.json());

// cookies 
app.use(cookieParser());

// Use body-parser middleware to parse form data 
app.use(bodyParser.urlencoded({extended:true, limit: "50mb"}));

// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "config/.env",
    })
}

// import routes
const contact =  require("./controller/contact");

// Define a route for the root URL
app.use("/api/contact", contact);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app
