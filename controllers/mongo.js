const mongoose = require("mongoose")
require("dotenv").config()

if (process.argv.length < 3) {
    console.log("please provide the password as an argument node mongo.js <password>")
    process.exit(1)
}

const url = process.env.MONGO_DB_CONNECTION_STRING
console.log("qual é a url?", url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model("Note", noteSchema)

// CREATE
const note = new Note({
    content: "J'San - Awekening",
    date: new Date(),
    important: true
})

note.save().then(response => {
    console.log("note saved", response)
    mongoose.connection.close()
}).catch((error) => {
    console.log(error)
}).finally(
    console.log("terminou")
)

// READ
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})