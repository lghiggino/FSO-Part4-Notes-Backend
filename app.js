const dotenv = require('./utils/config')
const express = require('express')
const cors = require('cors')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/utils')
const notesRouter = require('./controllers/notes')

const Note = require('./models/note')

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = { app }