import {AsyncHandller} from "../utils/AsyncHandller.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../modules/auth/model/user.model.js"
import jwt from "jsonwebtoken"


export const isAuthenticated= AsyncHandller(async(req,resp,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ApiError(404,"Not Authenticated"));
    }
    const decode=jwt.verify(token,process.env.JWT_SICRET_KEY)
    req.user=await User.findById(decode.id);
    next();
})

export const isAuthorized=(...role)=>{
    return (req,resp,next)=>{
        if(!role.includes(req.user.role)){
            return next(new ApiError(`&{req.user.role} not allowd to access this resource.`))
        }
        next();
    }
}