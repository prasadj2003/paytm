const express = require("express");
const router = express.Router();
const {Account} = require("../models/accountSchema")
const {User}  = require("../models/userSchema.js")
const {authMiddleware} = require("../middleware.js")


router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({userId: req.userId});
    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const {amount, to} = req.body;
    const account = await Account.findOne({userId: req.userId});

    if(account.balance < amount){
        res.status(400).json({
            msg: "insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.json({
        message: "Transfer successful"
    })
})

module.exports = router;