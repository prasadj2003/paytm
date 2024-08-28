const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.MONGO_URI)
    .then("DB connected")
    .catch("error connecting to database")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 15,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 15,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Aser = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User, 
    Account
}