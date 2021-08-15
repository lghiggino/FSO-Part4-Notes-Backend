const mongoose = require("mongoose")
require("dotenv").config()


const url = process.env.MONGO_DB_CONNECTION_STRING

console.log(`connecterd to ${url}`)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then( () => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.error("Error connecting to MongoDB", error)
    })

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean
})

//transforming the returned Note, and using the __ parameters
noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Note", noteSchema)