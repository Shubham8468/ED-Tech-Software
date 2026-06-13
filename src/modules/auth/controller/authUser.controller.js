import {AsyncHandller} from "../../../utils/AsyncHandller.js"
import {ApiResponse} from "../../../utils/ApiResponse.js"
import { ApiError } from "../../../utils/ApiError.js";
import { sendToken } from "../../../utils/jwtToken.js";
import {registerService, loginUser as loginUserService} from "../service/user.service.js"


// user Register function here.....


export const registerController = AsyncHandller(async (req,resp)=>{
    const {
        fullName,phoneNumber,email,password,role
    }=req.body;
    const createUser= await registerService({
       fullName,phoneNumber,email,password,role
    });
    if(!createUser){
         throw new ApiError(400, "User not registered, Please Try Again !");
    }
    return sendToken(createUser,200,resp,"User register Successfully!"); 
})

// user Login ..............

export const loginUser=AsyncHandller(async (req,resp)=>{
    const {email,password}=req.body;
    const loggedUser= await loginUserService({email,password});
    if(!loggedUser){
        throw new ApiError(401, "User Not logged.. try again !");
    }
    return sendToken(loggedUser,200,resp,"User Login Successfully !");
})
export const userLogout= AsyncHandller(async (req,resp)=>{
    resp.status(200).cookie("token","",{
        expires:new Date(
            Date.now()
        ),
        httpOnly:true,
    }).json({
        success:true,
        message:"User Logout Successfully !"
    })
})