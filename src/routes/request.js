const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter  = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  // Sending a connection request
  console.log("Sending Connection request");

  res.send(user.firstName + "Sent the connection request");
});


module.exports = requestRouter;