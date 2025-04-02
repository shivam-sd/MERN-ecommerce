const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
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
    businessType:{
        type:String,
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
        enum:["user","SELLER"],
        default:"SELLER"
    }
});

const sellerModel = new mongoose.model("seller" , sellerSchema);

module.exports = sellerModel;