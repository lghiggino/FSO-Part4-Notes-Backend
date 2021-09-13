const commentsRouter = require("express").Router()
const Comment = require("../models/commentModel")

commentsRouter.get("/", async (request, response) => {
    const notes = await Note.find({})
    response.json(notes)
})

commentsRouter.post("/", async (request, response, next) => {
    const body = request.body

    const comment = new Comment({
        content: body.content,
        votes: body.votes,
        date: new Date()
        // user: body.user
    })
    const savedComment = await comment.save()
    response.json(savedComment)

})

module.exports = commentsRouter