const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

test("notes are returned as json", async () => {
    await api
        .get("/api/notes")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("there are two notes", async () => {
    const response = await api.get("/api/notes")
    expect(response.body).toHaveLength(2)
})

test("the first note is about HTTP methods", async () => {
    const response = await api.get("/api/notes")
    expect(response.body[0].content).toBe("HTML is easy")
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