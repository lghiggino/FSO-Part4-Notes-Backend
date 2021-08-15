const mongoose = require("mongoose")
require("dotenv").config()


if (process.argv.length < 3) {
    console.log("please provide the password as an argument node mongo.js <password>")
    process.exit(1)
}

const url = process.env.MONGO_DB_USERS_CONNECTION_STRING

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const userSchema = new mongoose.Schema({
    userName: String,
    createDate: Date
})

const User = mongoose.model("User", userSchema)

const user = new User({
    userName: "novo User criado em users.js",
    createDate: new Date(),
})


user.save().then(response => {
    console.log("user saved", response)
    mongoose.connection.close()
}).catch( (error) => {
    console.log(error)
}).finally(
    console.log("terminou de salvar user")
)

User.find({}).then(result => {
    result.forEach(user => {
        console.log(user)
    })
    mongoose.connection.close()
})
