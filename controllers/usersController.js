const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/userModel")

// usersRouter.get("/", (request, response) => {
//     User.find({}).then(users => {
//         response.json(users)
//     })
// })

// usersRouter.get("/info", (request, response) => {
//     User.find({}).then(users => {
//         let numberOfUsers = users.length
//         response.send(`<h1>As of today, ${new Date().toLocaleDateString()}, users has ${numberOfUsers} users. </h1>`)
//     })
// })

usersRouter.post("/", async (request, response, next) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        console.log(error)
    }
})

module.exports = usersRouter
