import {ApiError} from "../../../utils/ApiError.js"
import { sendToken } from "../../../utils/jwtToken.js";
import {User} from "../model/user.model.js"


export const  registerService = async ({
    
        
        fullName,phoneNumber,email,password,role
})=>{
    if( [fullName,phoneNumber,email,password].some(f => !f?.trim())){
      throw new ApiError(400, "All fields are required !");
    }  
    
    const existingUser = await User.findOne({email});
    if(existingUser ){
        throw new ApiError(409, "Email already registered !");
    }
    const user=await User.create({
       fullName,phoneNumber,email,password,role
    })
    return user;
}


export const loginUser= async({email,password})=>{
    if([email,password].some(f=>!f?.trim())){
        throw new ApiError(400, "All fields are required !");
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new ApiError(404, "User Not Found, Please register");
    }
    const passwordIsMatch= await user.comparePassword(password);
    if(!passwordIsMatch){
        throw new ApiError(401, "Wrong Password, Try Again!");
    }
    return user;
}
