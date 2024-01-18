const app = require("./app");
const connectDatabase = require("./db/Database");

// Set the port for the server to listen on


process.on("uncaughtException", (err) => {
  console.log(`Caught exception: ${err}`);
  console.log("shutting down the server for handling uncaught exception");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const port = process.env.PORT || 4000;

// connection db
// connectDatabase();

// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("rejectionHandled", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
