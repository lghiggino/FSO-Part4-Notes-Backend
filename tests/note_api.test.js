const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Note = require("../models/noteModel")


beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()
    noteObject = new Note(helper.initialNotes[1])
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
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    it("should return a specific note within the returned notes", async () => {
        const response = await api.get("/api/notes")
        const contents = response.body.map(r => r.content)
        expect(contents).toContain("Browser can execute only Javascript")
    })

    it("should be able to view a specific note", async () => {
        const notesAtStart = await helper.notesInDb() //retorna um map do get({})
        const noteToView = notesAtStart[0]
        console.log("noteToView", noteToView)

        const resultNote = await api
            .get(`/api/notes/${noteToView}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
        expect(resultNote.body).toEqual(processedNoteToView)
    }, 30000)
})

describe("POST", () => {
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

    it("should not allow a note without content to be saved", async () => {
        const newNote = {
            important: true
        }

        await api.post("/api/notes").send(newNote).expect(400)

        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

// CTRL+F:  Our tests can now use helper module and be changed like this

describe("DELETE", () => {

    it("should delete a note using its id as reference", async () => {
        const notesAtStart = await helper.notesInDb() //retorna um map do get({})
        const noteToRemove = notesAtStart[0]

        await api
            .delete(`/api/notes/${noteToRemove}`)
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