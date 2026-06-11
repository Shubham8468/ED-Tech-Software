import express from "express"
import {config} from "dotenv"
import cors from "cors"
import {connectDb} from "./db/dbConn.js"
import cookieParser from "cookie-parser";
import userRouter from "./modules/auth/routes/user.router.js";
config({
    path:"../.env"
})

const app= express();

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

connectDb();

app.use("/api/v1/user",userRouter);

export default app;
