const express = require("express");

const app = express();

app.use("/",(req,res)=>{
     res.send("Hello from the server")
     })
     
app.use("/test",(req,res)=>{
res.send("Hello from the test")
});

app.use("/hello",(req,res)=>{
res.send(" Hello! Hello! Hello!")
});


app.listen(3000, ()=>{
     console.log("server is succesfully load")
});