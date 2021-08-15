require("dotenv").config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGO_DB_CONNECTION_STRING

module.exports = {
    PORT,
    MONGODB_URI
}