const express = require("express");
const { userAuth } = require("../middleware/auth");
const {validateEditProfileData} = require("../utilis/validation")
const User = require("../models/user")

const profileRouter = express.Router();
const crypto = require('crypto');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
   if (!validateEditProfileData(req)){
   throw new Error("Invalid Edit Requests")
   } 
   const loggedInUser = req.user;

   Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]));

    await loggedInUser.save();

   res.json({
    message: `${loggedInUser.firstName} your profile Updated Successfully`,
  data:loggedInUser,});

  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
}); 

profileRouter.patch("/profile/password", userAuth, async(req,res)=>{

  const {emailId} = req.body;
  try{
    const user = await User.findOne({emailId});
  
  if(!user){
    return res.status(400).send("User Not found"
    )
  }
   const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 1000 * 60 * 60;

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

     const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    console.log("Reset link:", resetLink);
     res.json({ message: 'Reset link sent to your email (check console).' });

  }
  catch (err){
   res.status(400).send("ERROR :" + err.message);
  }
})

module.exports = profileRouter;
