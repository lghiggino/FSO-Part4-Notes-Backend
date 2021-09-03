const notesRouter = require("express").Router()
const Note = require("../models/noteModel")

notesRouter.get("/", async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

notesRouter.get("/info", async (request, response) => {
    const notes = await Note.find({})
    let numberOfNotes = notes.length
    response.send(`<h1>As of today, ${new Date().toLocaleDateString()}, notes has ${numberOfNotes} notes.1ss </h1>`)
})

notesRouter.get("/:id", async (request, response, next) => {
    const note = Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

notesRouter.post("/", async (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date()
    })
    try {
        const savedNote = await note.save()
        response.json(savedNote)
    }
    catch (exception) { next(exception) }
})

notesRouter.delete("/:id", async (request, response, next) => {
    try {
        await Note.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch (exception) { next(exception) }
})

notesRouter.put("/:id", async (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    try {
        const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
        response.json(updatedNote)
    }
    catch (exception) { next(exception) }
})

module.exports = notesRouter