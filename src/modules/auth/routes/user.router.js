import express from "express"
import {registerController,loginUser, userLogout} from "../controller/authUser.controller.js"
import { isAuthenticated } from "../../../middlewares/auth.js";



const userRouter =express.Router();

userRouter.post("/register",registerController);
userRouter.post("/login",loginUser);
userRouter.get("/logout",isAuthenticated,userLogout);

export default userRouter;