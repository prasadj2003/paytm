const { default: mongoose } = require('mongoose');

const transactionSchema = new mongoose.Schema({
    to: String,
    amount: {type: Number, require: true}
});

module.exports = mongoose.model("Transaction", transactionSchema);