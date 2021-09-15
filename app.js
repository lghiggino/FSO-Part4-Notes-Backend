const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const notesRouter = require("./controllers/notesController")
const usersRouter = require("./controllers/usersController")
const commentRouter = require("./controllers/commentsController")
const loginRouter = require("./controllers/loginController")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")
const commentsRouter = require("./controllers/commentsController")

logger.info(`connecting to ${config.MONGODB_URI} ...`)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch(error => {
        logger.error("error connecting to MongoDB:", error.message)
    })


app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/notes", notesRouter)
app.use("/api/users", usersRouter)
app.use("/api/comments", commentsRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
