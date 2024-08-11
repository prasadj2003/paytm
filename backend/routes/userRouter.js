const express = require("express");
const router = express.Router();
const { z } = require("zod");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { User } = require("../connection/connect");

const signupBody = z.object({
  userName: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(6),
});

router.post("/signup", async (req, res, next) => {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      msg: "Email already taken / incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    userName: req.body.userName,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  const user = User.create({
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    password: password,
  });

  const userId = user._id;

  const token = jwt.sign({
    userId,
    JWT_SECRET,
  });

  res.json({
    msg: "user created successfull",
    token: token,
  });
});

const signinBody = z.object({
  userName: z.string.email(),
  password: z.string().min(6),
});

router.post("/signin", async (req, res, next) => {
  try {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        msg: "enter proper values / enter proper email",
      });
    }

    // data is correct now check if it matches
    if (success) {
      const user = await User.findOne({
        userName: req.body.userName,
        password: req.body.password,
      });

      if (user === null) {
        return res.status(401).json({
          msg: "email and password don't match",
        });
      } else {
        const token = jwt.sign({
          userId: user._id,
          JWT_SECRET,
        });

        res.json({
          token: token,
        });

        return;
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: "ann error occured while signing in",
      error: error.message,
    });
  }
});


module.exports = userRouter