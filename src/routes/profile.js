const express = require("express");
const { userAuth } = require("../middleware/auth");
const {validateEditProfileData} = require("../utilis/validation")

const profileRouter = express.Router();

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


module.exports = profileRouter;
