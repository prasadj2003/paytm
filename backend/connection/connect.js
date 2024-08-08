// URI mongodb+srv://ppjoshi2003:MU2a5fRRa1kS1Sde@cluster0.llc93zm.mongodb.net/
const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://ppjoshi2003:MU2a5fRRa1kS1Sde@cluster0.llc93zm.mongodb.net/");
        console.log("DB connected")
    } catch (error) {
        console.log("error connecting to DB: " + error)
    }
}

module.exports = connect;

