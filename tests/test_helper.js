const Note = require("../models/noteModel")
const User = require("../models/userModel")
const Comment = require("../models/commentModel")

const initialNotes = [
    {
        content: "HTML is easy",
        date: new Date(),
        important: false
    },
    {
        content: "Browser can execute only Javascript",
        date: new Date(),
        important: true
    },
]

const nonExistingId = async () => {
    const note = new Note({
        content: "willRemoveThisSoon",
        date: new Date()
    })
    await note.save()
    await note.remove()

    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(note => note.toJSON())
}

const commentsInDb = async () => {
    const comments = await Comment.find({})
    return comments.map(note => note.toJSON())
}


module.exports = {
    initialNotes,
    nonExistingId,
    notesInDb,
    usersInDb,
    commentsInDb
}