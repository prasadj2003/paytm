const express = require("express");
const userRouter = require("./userRouter") 
const router = express.Router();

router.get('/user', userRouter)



module.exports = router;