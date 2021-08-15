const notesRouter = require("express").Router()
const Note = require("../models/note")

notesRouter.get("/", (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

notesRouter.get("/info", (request, response) => {
    Note.find({}).then(notes => {
        let numberOfNotes = notes.length
        response.send(`<h1>As of today, ${new Date().toLocaleDateString()}, notes has ${numberOfNotes} notes.1ss </h1>`)
    })
})

notesRouter.get("/:id", (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

notesRouter.post("/", (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })

    note.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
})

notesRouter.delete("/:id", (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

notesRouter.put("/:id", (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter