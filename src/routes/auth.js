const express = require("express");
const { validateSignUpData } = require("../utilis/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of Data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //  creating a new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "USER SAVED SUCCESSFULLY", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

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

      // ✅ Use same cookie settings as /signup
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


authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("logout suucessfull!!");
});

module.exports = authRouter;
