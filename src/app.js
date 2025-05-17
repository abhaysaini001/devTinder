const express = require ("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.use(express.json());


app.post("/signup",async (req,res)=>{
  

    //  creating a new instance of the User Model
     const user = new User(req.body);
          

     try{
       await user.save();
       res.send("User Added Successfully")
     }
     catch(err){
       res.status(400).send("Error saving the user:"+ err.message);
     }
});

connectDB()
  .then(() => {
    console.log("Database Connection established..");
    app.listen(3000, ()=>{
     console.log("server is succesfully load....");
});
  })
  .catch((err) => {
    console.error("Database Cannot be connected!!",err.message);
  });

