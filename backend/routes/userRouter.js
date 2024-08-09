const express = require("express");
const router = express.Router();
const {z} = require("zod");
const jwt = require("jsonwebtoken");

router.post('/signup', (req, res, next) => {
    const {password, firstName, lastName, userName} = req.body;
    const validatedPassword = z.string().min(6);
    const validateFirstName = z.string().min(2);
    const validateLastName = z.string().min(2);
    const validateUserName = z.string();

    const result = (validatedPassword.safeParse(password) && validateFirstName.safeParse(firstName) && validateLastName.safeParse(lastName) && validateUserName.safeParse(userName))
    if(!result.success){
        res.status(411).json({
            msg: "enter proper credentials"
        });
    }
    else{
        const JWTtoken = jwt.sign(userName, password);
        res.status(200).json({
            token: JWTtoken,
            msg: "user signed up successfully"
        })
    }
})