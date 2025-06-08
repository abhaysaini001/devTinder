const express = require("express");
const { validateSignUpData } = require("../utilis/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("INVALID CREDENTIALS");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send(user);
    } else {
      throw new Error("INVALID CREDENTIALS");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
