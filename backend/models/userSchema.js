import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    password: {type: String, required: true, min: 6},
    firstName: {type: String, required: true, min: 2},
    lastName: {type: String, required: true, min: 2},
    // amount: {type: Number, require: true}
    userName: String
});


module.exports = mongoose.model("User", userSchema);