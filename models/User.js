const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required:true,            
        },
        email:{
            type:String,
            required:true,
           
        },
        password: {
            type:String,
            required:true,
            min:8,
        },
        isAgree: {
            type:Boolean,
            required:false,
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("User",UserSchema,"Users");