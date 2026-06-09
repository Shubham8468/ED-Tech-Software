import {AsyncHandller} from "../../../utils/AsyncHandller.js"
import {ApiResponse} from "../../../utils/ApiResponse.js"
const registerController = AsyncHandller(async (req,resp)=>{
    const {phoneNumber,email,password,role}=req.body;
    const createUser= await registerService({phoneNumber,email,password,role});
    return resp.status(200).json(
        new ApiResponse(200,createUser)
    )
})