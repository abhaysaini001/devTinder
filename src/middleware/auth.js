 const adminAuth = (req,res,next)=>{
    console.log("Admin auth is checked")
    const token ="xyz";
    const isAdminAuthorized = token ==="xyz";
    if (!isAdminAuthorized){
         res.status(401).send("unAuthorized Request");
    }
    else{
         next();
    }
};

const userAuth = (req,res,next)=>{
    console.log("User auth is checked")
    const token ="xyz";
    const isAdminAuthorized = token ==="xyz";
    if (!isAdminAuthorized){
         res.status(401).send("unAuthorized Request");
    }
    else{
         next();
    }
};


module.exports={
    adminAuth,
    userAuth,
}