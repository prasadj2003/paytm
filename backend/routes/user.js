const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {JWT_SECRET} = require("../config");
const {z} = require("zod");
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");

const signupBody = z.object({
    username: z.string().email(),
    firstName: z.string().min(2).max(15),
    lastName: z.string().min(2).max(15),
    password: z.string().min(6)
})

router.get('/signup', authMiddleware, async (req, res) => {
    //This uses destructuring assignment to extract the success property from the object returned by signupBody.safeParse(req.body).
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg: "error signing up please try again"
        })
    }


    // check for existing values in DB

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            msg: "user already exists"
        })
    }

    // else put the values in DB
    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    // return unique token to user
    const userId = user._id;
    await Account.create({
        userId,
        balance: 10000 * Math.random() + 1
    })
    const token = jwt.sign(userId, JWT_SECRET);

    res.status(200).json({
        msg: "account created successfully",
        token: token
    });
});




