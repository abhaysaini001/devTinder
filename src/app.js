const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middleware/auth")
app.use("/admin",adminAuth)

app.get("/user",userAuth,(req,res)=>{
     res.send("User data sent")
});
app.get("/admin/getAllData",(req,res)=>{
     res.send("all data sent")
});

app.get("/admin/deleteUser",(req,res)=>{
     res.send("User Deleted") 
})



app.listen(3000, ()=>{
     console.log("server is succesfully load");
});