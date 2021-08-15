
const app = require("./app")
const http = require("http")
const config = require ("./utils/config")
const logger = require ("./utils/logger")

const server = http.createServer(app)
 
server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})

// require("dotenv").config()
// const express = require("express")
// const app = express()
// const Note = require("./models/note")



// /***MIDDLEWARE***/
// app.use(express.static("build"))
// app.use(express.json())




// /***ROUTES***/
// app.get("/", (request, response) => {
//     response.send("<h1>The Notes frontEnd should be loaded. if you're seeing this mesage check the app definitions to render app.use(express.static('build')) </h1>")
// })

// app.get("/api/notes", (request, response) => {
//     Note.find({}).then(notes => {
//         response.json(notes)
//     })
// })

// //fetching a single resource in RestfulApis
// app.get("/api/notes/:id", (request, response, next) => {
//     const id = request.params.id

//     Note.findById(id)
//         .then(note => {
//             console.log(note)
//             if (note) {
//                 response.json(note)
//             } else {
//                 response.status(404).end()
//             }
//         })
//         .catch(error => next(error))
// })

// //deleting resources
// app.delete("/api/notes/:id", (request, response, next) => {
//     const id = request.params.id
//     Note.findByIdAndDelete(id)
//         .then( () => {
//             response.status(204).end()
//         })
//         .catch(error => next(error))


// })

// app.put("/api/notes/:id/importance", (request, response, next) => {
//     // console.log(request.params.id)
//     // console.log("com o valor já invertido", request.body)
//     // const note = notes.find(note => note.id === request.params.id)

//     // const changedNote = { ...note }
//     // changedNote.id = request.body.id
//     // changedNote.content = request.body.content
//     // changedNote.date = request.body.date
//     // changedNote.important = request.body.important

//     // response.json(changedNote)
//     const body = request.body
//     const id = request.params.id

//     const note = {
//         content: body.content,
//         important: body.important
//     }

//     Note.findByIdAndUpdate(id, note, { new: true })
//         .then(updatedNote => {
//             response.json(updatedNote)
//         })
//         .catch(error => next(error))
// })

// // app.put("/api/notes/:id/date", (request, response) => {
// //     const newDate = new Date().toISOString()

// //     const note = notes.find(n => { n.id === request.params.id })

// //     const changedNote = { ...note }
// //     changedNote.id = request.body.id
// //     changedNote.content = request.body.content
// //     changedNote.date = newDate
// //     changedNote.important = request.body.important

// //     response.json(changedNote)
// // })

// app.post("/api/notes", (request, response, next) => {
//     const body = request.body

//     if (!body.content) {
//         return response.status(400).json({ error: "content missing" })
//     }

//     const note = new Note({
//         content: body.content,
//         important: body.important || false,
//         date: new Date(),
//     })

//     note
//         .save()
//         .then(savedNote => {
//             //console.log("savedNote", savedNote)
//             return savedNote.toJSON()
//         }).then(savedAndFormattedNote => {
//             //console.log("savedAndFormattedNote", savedAndFormattedNote)
//             response.json(savedAndFormattedNote)
//         }).catch(error => {
//             next(error)
//         })

// })

// const unknownEndpoint = (req, res) => {
//     res.status(404).send({ error: "unknown endpoint" })
// }
// app.use(unknownEndpoint)

// const errorHandler = (error, request, response, next) => {
//     console.log("======================+CHEGOU AQUI+=============================")
//     console.error(error.message)

//     if (error.name === "CastError") {
//         return response.status(400).send({ error: "malformatted id" })
//     } else if (error.name === "ValidationError") {
//         return response.status(400).send({ error: error.message })
//     } else {
//         next(error)
//     }
// }

// app.use(errorHandler)


// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

// //HEROKU ADDRESS: https://peaceful-crag-14176.herokuapp.com/api/notes
