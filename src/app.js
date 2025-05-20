const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //  creating a new instance of the User Model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// Get USer by EMail

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User Not Found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//feed API - GET/feed  -get all the user from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// delete the user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch {
    res.status(400).send("Something went wrong");
  }
});

//Update the data of the USER
app.patch("/user/:userId", async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body;

 
  try{
 const ALLOWED_UPDATES =[
    "photoUrl",
    "gender",
    "about",
    "age",
    "skills"];

// {
//     "userId": "682c396bc6121901c2448376",
//     "emailId": "aliaaa@bhatt.com",
//     "skills":["Acting","drama","bowling"],
   
//     "gender": "female"
// }

  const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));
  if(!isUpdateAllowed){
   throw new Error ("Update Not Allowed")
  }
  if(data?.skills.length >10){
    throw  new Error("skills cannot exceed more than 10")
  }

 const user = await User.findByIdAndUpdate({_id: userId},data, 
  {returnDocument:"after",
    runValidators:true,
  })
 console.log(user)
res.send("User updated successfully")
  }catch(err){
res.status(400).send("Update Failed" + err.message);
  }
})

connectDB()
  .then(() => {
    console.log("Database Connection established..");
    app.listen(3000, () => {
      console.log("server is succesfully load....");
    });
  })
  .catch((err) => {
    console.error("Database Cannot be connected!!", err.message);
  });
