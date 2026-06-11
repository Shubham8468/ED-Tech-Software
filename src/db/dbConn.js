import mongoose from "mongoose";
import { User } from "../modules/auth/model/user.model.js";

export const connectDb= async()=>{
    try {
        const db_Url=process.env.MONGO_URL
        if(!db_Url){
            throw new Error("MongoDb Url Missing in .env file")
        }
        await mongoose.connect(db_Url,{
            dbName:"ED-TECH-SOFTWARE"
        });
        console.log("DB connected !");
        
        // Sync indexes to automatically drop indexes that are no longer in the schema (e.g. username_1)
        await User.syncIndexes();
    } catch (error) {
        console.log(`DB not connected ${error.message || error}`);
    }
}