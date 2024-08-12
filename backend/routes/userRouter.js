const express = require("express");
const router = express.Router();
const { z } = require("zod");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { User } = require("../connection/connect");
import { authMiddleware } from "../middleware";

const signupBody = z.object({
  userName: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(6),
});

router.post("/signup", authMiddleware, async (req, res) => {
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

router.post("/signin", authMiddleware, async (req, res) => {
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


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
      $or: [{
          firstName: {
              "$regex": filter
          }
      }, {
          lastName: {
              "$regex": filter
          }
      }]
  })

  res.json({
      user: users.map(user => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }))
  })
})

module.exports = userRouter