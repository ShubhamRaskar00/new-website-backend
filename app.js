// Import required modules
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error");


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

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