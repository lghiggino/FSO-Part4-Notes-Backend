const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");

const notesRouter = require("./controllers/notes.controller");
const usersRouter = require("./controllers/user.controller");
const loginRouter = require("./controllers/login.controller");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");


logger.info("connecting to", config.MONGODB_URI);

(async () => {
  await mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
})();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require("./controllers/test.controller");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
