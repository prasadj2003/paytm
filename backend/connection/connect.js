// URI 
const mongoose = require("mongoose")
require('dotenv').config()

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected")
    } catch (error) {
        console.log("error connecting to DB: " + error)
    }
}

module.exports = connect;

