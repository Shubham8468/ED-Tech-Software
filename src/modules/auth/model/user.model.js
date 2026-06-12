import mongoose from "mongoose";    

import validator from "validator";
import { isValidPhoneNumber } from "libphonenumber-js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userShema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"Name must be at least 3 characters"],
        maxlength:[50,"Name connot exceed 50 characters"],
    },
    username:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:[3,"Username is be a least 3 characters"],
        maxlength:[20,"Username cannot exceed 20 characters"]
    },
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
    phoneNumber:{
        type:String,
        required:[true,"Phone number is required"],
        minlength:[10,"Phone number  must be at least 10 characters"],
    },
    password:{
        type:String,
        required:[true,"Password id required"],
        minlength:[8,"Password must be at least 8 characters"],
        select:false
    },
    avatar:{
        public_id:String,
        url:String
    },
    gender: {
      type: String,
      
      enum: ["male", "female", "other"],
    },
    bio:{
        type:String,
        maxlength:[500,"Bio cannot exceed 500 characters"],
        default:""
    },
    headline:{
      type:String
    },
    socialLinks: {
      linkedin: String,
      github: String,
      twitter: String,
      youtube: String,
      portfolio: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    role:{
        type:String,
        enum:["student","teacher","admin"],
        default:"student"
    },
     learningGoals: {
       type:String
     },
    isVerified:{
        type:Boolean,
        default:false
    },
    accountStatus:{
        type:String,
        emun:["active","blocked","suspended"],
        default:"active"
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    teachingCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
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