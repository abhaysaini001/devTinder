const mongoose = require("mongoose");
const validator = require("validator")

const userSchema =  new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid Email Address" + value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error ("Please Make Strong Password:" + value)
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value))
                throw new Error("Gender data is Not Valid")
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error ("Invalid Img Url:" +  value)
            }
        }
    },
    about :{
        type:String,
        default:"This is default value of user!"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true,
});


const User = mongoose.model("User",userSchema);

module.exports = User;