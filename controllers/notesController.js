const notesRouter = require("express").Router()
const Note = require("../models/noteModel")
const User = require("../models/userModel")

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
    const note = await Note.findById(request.params.id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }

})

notesRouter.post("/", async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
        user: user._id
    })
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.json(savedNote)

})

notesRouter.delete("/:id", async (request, response, next) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

notesRouter.put("/:id", async (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: body.important || false
    })


    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updatedNote)

})

module.exports = notesRouter