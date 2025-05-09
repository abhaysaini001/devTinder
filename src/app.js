const express = require("express");

const app = express();


//this will only handle get call to /user
app.get("/user", (req,res)=>{
     res.send({firstName:"Abhay",lastName:"Saini"});
});

app.post("/user", async(req,res)=>{
     console.log(req,body);
     //Saving data to DB
     res.send("Data Successfully saved in database!");
});

app.delete("/user",(req,res)=>{
     res.send("Deleted Successfully");
});

//this will match all the HTTP methods api call to /test
app.use("/test",(req,res)=>{
res.send("Hello from the server");
});

app.listen(3000, ()=>{
     console.log("server is succesfully load");
});