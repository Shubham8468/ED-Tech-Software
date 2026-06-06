import mongoose from "mongoose";
export const connectDb= async()=>{
    try {
        const db_Url=process.env.MONGO_URL
        if(!db_Url){
            throw new Error("MongoDb Url Missing in .env file")
        }
        await mongoose.connect(db_Url,{
            dbName:"ED-TECH-SOFTWARE"
        }).then(()=>{
            console.log("DB connected !");
        })
    } catch (error) {
        console.log(`DB not connected ${error.message || error}`);
        
    }
}