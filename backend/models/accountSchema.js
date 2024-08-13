import mongoose from "mongoose";
import {User} from "./userSchema"


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Account", accountSchema);