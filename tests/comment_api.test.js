const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Comment = require("../models/commentModel")


beforeEach(async () => {
    await Comment.deleteMany({})
})


describe("POST - USERS", () => {
    it("should create a new comment", async () => {
        const commentsAtStart = await helper.commentsInDb()

        const newComment = {
            content: "this is a brand new comment",
            votes: 0,
            date: new Date()
        }

        await api
            .post("/api/comments")
            .send(newComment)
            .expect(200)
            .expect("Content-Type", /application\/json/)


        const commentsAtEnd = await helper.commentsInDb()
        expect(commentsAtEnd).toHaveLength(commentsAtStart.length + 1)

        console.log(commentsAtEnd.body)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
