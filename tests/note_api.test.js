const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Note = require("../models/noteModel")

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

beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})

describe("GET", () => {
    it("should return notes as json", async () => {
        await api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    it("asserts the content of the first note", async () => {
        const response = await api.get("/api/notes")
        expect(response.body[0].content).toBe("HTML is easy")
    })

    it("returns all notes", async () => {
        const response = await api.get("/api/notes")
        expect(response.body).toHaveLength(initialNotes.length)
    })

    it("should return a specific note within the returned notes", async () => {
        const response = await api.get("/api/notes")
        const contents = response.body.map(r => r.content)
        expect(contents).toContain("Browser can execute only Javascript")
    })

})

describe("POST", () => {
    it("should add a valid new note", async () => {
        const newNote = {
            content: "Async/Await simplifies making async calls",
            date: new Date().toLocaleDateString(),
            important: true
        }

        await api.post("/api/notes").send(newNote).expect(200).expect('Content-Type', /application\/json/)
        const response = await api.get("/api/notes")
        const contents = response.body.map(r => r.content)

        expect(response.body).toHaveLength(3)
        expect(contents).toContain("Async/Await simplifies making async calls")
    })
})



afterAll(() => {
    mongoose.connection.close()
})