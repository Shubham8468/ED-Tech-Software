import mongoose from "mongoose";    

import validator from "validator";
import { isValidPhoneNumber } from "libphonenumber-js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userShema= new mongoose.Schema({
    
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        trim:true,
        validate:{
            validator:validator.isEmail,
            message:"Please provied a valid email"
        }
    },
    
    password:{
        type:String,
        required:[true,"Password id required"],
        minlength:[8,"Password must be at least 8 characters"],
        select:false
    },
    
    role:{
        type:String,
        enum:["student","teacher","admin"],
        default:"student"
    },
     
    
    refreshToken:{
        type:String,
        default:null,
        select:false
    },
    lastLogin:{
        type:Date
    },
    
},{timestamps:true});

userShema.methods.getJWTToken=function(){
    return jwt.sign({
        id:this._id
    },
    process.env.JWT_SICRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    }
)
}

userShema.pre("save",async function (next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

userShema.methods.comparePassword=async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password);
}


export const User=mongoose.model("User",userShema);