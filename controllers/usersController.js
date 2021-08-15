const usersRouter = require("express").Router()
const User = require("../models/userModel")

usersRouter.get("/", (request, response) => {
    User.find({}).then(users => {
        response.json(users)
    })
})

usersRouter.get("/info", (request, response) => {
    User.find({}).then(users => {
        let numberOfUsers = users.length
        response.send(`<h1>As of today, ${new Date().toLocaleDateString()}, users has ${numberOfUsers} users. </h1>`)
    })
})

usersRouter.post("/", (request, response, next) => {
    const body = request.body

    const user = new User({
        userName: body.username,
        createDate: new Date()
    })

    user.save()
        .then(savedUser => {
            response.json(savedUser)
        })
        .catch(error => { next(error) })
})

module.exports = usersRouter

// user.save().then(response => {
//     console.log("user saved", response)
//     mongoose.connection.close()
// }).catch( (error) => {
//     console.log(error)
// }).finally(
//     console.log("terminou de salvar user")
// )

// User.find({}).then(result => {
//     result.forEach(user => {
//         console.log(user)
//     })
//     mongoose.connection.close()
// })
