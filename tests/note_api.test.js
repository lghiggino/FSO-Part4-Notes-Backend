const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Note = require("../models/noteModel")


beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
})

describe("GET - when there is initially some notes saved", () => {
    it("should return notes as json", async () => {
        await api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    it("returns all notes", async () => {
        const response = await api.get("/api/notes")
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    it("should return a specific note within the returned notes", async () => {
        const response = await api.get("/api/notes")
        const contents = response.body.map(r => r.content)
        expect(contents).toContain("Browser can execute only Javascript")
    })

    it("asserts the content of the first note", async () => {
        const response = await api.get("/api/notes")
        expect(response.body[0].content).toBe("HTML is easy")
    })
})

describe("GET - viewing a specific note", () => {
    it("should be able get using the id", async () => {
        const notesAtStart = await helper.notesInDb()

        const noteToView = notesAtStart[0]

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

        expect(resultNote.body).toEqual(processedNoteToView)
    }, 30000)

    it("fails with statuscode 404 if note does not exist", async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
            .get(`/api/notes/${validNonexistingId}`)
            .expect(404)
    })

    test("fails with statuscode 400 id is invalid", async () => {
        const invalidId = "5a3d5da59070081a82a3445"

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe("POST - addition of a new note", () => {
    it("should add a valid new note", async () => {
        const newNote = {
            content: "Async/Await simplifies making async calls",
            date: new Date().toLocaleDateString(),
            important: true
        }

        await api.post("/api/notes").send(newNote).expect(200).expect("Content-Type", /application\/json/)
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

        const contents = notesAtEnd.map(n => n.content)
        expect(contents).toContain("Async/Await simplifies making async calls")
    })

    it("should fail with status code 400 if data is invalid", async () => {
        const newNote = {
            important: true
        }

        await api.post("/api/notes").send(newNote).expect(400)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})


describe("DELETE - deletion of a note", () => {
    it("should delete a note using its id as reference", async () => {
        const notesAtStart = await helper.notesInDb() //retorna um map do get({})
        const noteToRemove = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToRemove.id}`)
            .expect(204)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

        const contents = notesAtEnd.map(r => r.content)
        expect(contents).not.toContain(noteToRemove.content)
    })
})


afterAll(() => {
    mongoose.connection.close()
})