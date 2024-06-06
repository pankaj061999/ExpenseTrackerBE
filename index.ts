import mongoose from "mongoose";
import app from "./app";
import config from "./src/config/config";

let server: any; // Define server variable

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  server = app.listen(config.port, () => {
    console.log(`Listening to port connected ${config.port}`);
  });
});

const unexpectedErrorHandler = (error: Error) => {
  console.error(error); // Log error to console
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
