import {ApiError} from "../../../utils/ApiError.js"

export const  registerService = ({phoneNumber,email,password,role})=>{
    if( [phoneNumber,email,password,role].some(f => !f?.trim())){
      ApiError(404,"All fields are required !");
    }  
}

