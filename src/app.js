const express = require("express");

const app = express();

app.get("/getUserData", (req,res)=>{
     try {
            throw new Error("dvbzhjf")
     res.send("User Data Sent")
     } catch (error) {
          res.status(500).send("Some Eroor Occured Contact Support Team")
     }
     //Logic of DB Call and get User Data
   
})

app.use("/",(err,req,res,next)=>{
if(err){
     res.status(500).send("something went wrong");
}
});

app.listen(3000, ()=>{
     console.log("server is succesfully load");
});