const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:""
    },
    role:{
        type:String,
        enum:["USER","SELLER","ADMIN"],
        default:"USER"
    }
});

const userModel = new mongoose.model("users" , userSchema);

module.exports = userModel;