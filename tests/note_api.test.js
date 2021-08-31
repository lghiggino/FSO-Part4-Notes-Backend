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

beforeEach( async () => {
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

    it("asserts that are TWO notes", async () => {
        const response = await api.get("/api/notes")
        expect(response.body).toHaveLength(2)
    })

    it("asserts the content of the first note", async () => {
        const response = await api.get("/api/notes")
        expect(response.body[0].content).toBe("HTML is easy")
    })

    it("note with id is returned properly", async () => {
        //     const result = await api
        //         .get("/api/notes/1")
        //         .expect(200)
        //         .expect("Content-Type", /application\/json/)
        //     console.log(result)
        // })
    })
})

describe.skip("POST", () => {
    it("post one", async () => {
        const result = await api.post("/api/notes",
            {
                "content": "Banana",
                "date": new Date().toLocaleDateString(),
                "important": true
            }
        )
        // .expect(200)
        // .expect("Content-Type", /application\/json/)
        console.log(result)
        expect(result.content).toBe("Banana")
    })
})


// test("post one", async () => {
//     const result = await api.post("/api/notes", { "content": "Banana", "date": new Date().toLocaleDateString(), "important": true })
//     // .expect(200)
//     // .expect("Content-Type", /application\/json/)
//     console.log(result)
//     expect(result.content).toBe("Banana")
// })

// test("note with id is returned properly", async () => {
//     const result = await api
//         .get("/api/notes/1")
//         .expect(200)
//         .expect("Content-Type", /application\/json/)
//     console.log(result)
// })


afterAll(() => {
    mongoose.connection.close()
})