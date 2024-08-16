const express = require("express");
const router = express.Router();
const {Account} = require("../models/accountSchema")
const {User}  = require("../models/userSchema.js")
const {authMiddleware} = require("../middleware.js");
const { default: mongoose } = require("mongoose");


router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.find({userId: req.userId});
    res.status(200).json({
        balance: account.balance
    })
})


// this is the naive solution without implementing transactions in mongoDB. So if by chance our mongoDB instance crashes and the transaction is not completed
// it will result in inconsistency in the DB

router.post('/transfer', authMiddleware, async (req, res) => {
    const {amount, to} = req.body;
    const account = await Account.find({userId: req.userId});

    if(account.balance < amount){
        res.status(400).json({
            msg: "insufficient balance"
        })
    }

    const toAccount = await Account.find({
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

// better solution with transaction. but not working for some reason

// router.post('/transfer', authMiddleware, async(req, res) => {
//     const session = await mongoose.startSession();

//     const {amount, to} = req.body;

//     const account = await Account.find({userId: req.userId}).session(session)

//     if(!account || account.balance < amount){
//         await session.abortTransaction();
//         return res.status(400).json({
//             msg: "Insuifficient balance"
//         })
//     }

//     const toAccount = await User.find({userId: to});

//     if(!toAccount){
//         await session.abortTransaction();
//         return res.status(400).json({
//             msg: "user with given Id not found"
//         });
//     }

//     await account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
//     await account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

//     await session.commitTransaction();

//     console.log("this is before ending the session");
//     session.endSession().catch(() => {msg: "endSession failed"})

//     // console.log("error has appeared after endSession");
//     res.json({
//         msg: "transaction successfull"
//     })
// })

module.exports = router;

// backend/routes/account.js
// const express = require('express');
// const { authMiddleware } = require('../middleware');
// const { Account } = require('../connection/connect.js');
// const { default: mongoose } = require('mongoose');

// const router = express.Router();

// router.get("/balance", authMiddleware, async (req, res) => {
//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     if (!account) {
//         return res.status(404).json({ msg: "Account not found" });
//     }

//     res.json({
//         balance: account.balance
//     });
// });

// async function transfer(req) {
//     const session = await mongoose.startSession();
//     session.startTransaction();
    
//     try {
//         const { amount, to } = req.body;

//         // Fetch the accounts within the transaction
//         const account = await Account.findOne({ userId: req.userId }).session(session);

//         if (!account || account.balance < amount) {
//             await session.abortTransaction();
//             console.log("Insufficient balance");
//             return;
//         }

//         const toAccount = await Account.findOne({ userId: to }).session(session);

//         if (!toAccount) {
//             await session.abortTransaction();
//             console.log("Invalid account");
//             return;
//         }

//         // Perform the transfer
//         await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//         await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//         // Commit the transaction
//         await session.commitTransaction();
//         console.log("Transaction successful");
//     } catch (error) {
//         await session.abortTransaction();
//         console.log("Transaction failed", error.message);
//     } finally {
//         session.endSession();
//     }
// }

// // Simulate the Express request object
// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// });

// module.exports = router;
