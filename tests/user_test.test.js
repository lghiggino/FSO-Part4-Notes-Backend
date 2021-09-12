const bcrypt = require("bcrypt")
const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const User = require("../models/userModel")


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
})

describe("GET - USERS", () => {
    it("should initialize the DB with a user", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "mluukkai",
            name: "Mattu Luukkainen",
            password: "salainen"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.lenght + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})





afterAll(() => {
    mongoose.connection.close()
})