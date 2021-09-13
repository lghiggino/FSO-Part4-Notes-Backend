const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    votes:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }
})

//transforming the returned Note, and using the __ parameters
commentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment