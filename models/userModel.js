const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: 5,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
})


module.exports = mongoose.model("User", userSchema)
