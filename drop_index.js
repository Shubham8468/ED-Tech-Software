import mongoose from "mongoose";
import dotenv from "dotenv";

// Load env
dotenv.config();

const dropIndex = async () => {
    try {
        const db_Url = process.env.MONGO_URL;
        if (!db_Url) {
            throw new Error("MONGO_URL missing from .env");
        }
        
        console.log("Connecting to:", db_Url);
        await mongoose.connect(db_Url, {
            dbName: "ED-TECH-SOFTWARE"
        });
        
        console.log("DB connected!");
        const db = mongoose.connection.db;
        
        const usersCollection = db.collection("users");
        
        // List indexes
        const indexes = await usersCollection.indexes();
        console.log("Current indexes on 'users':", indexes);
        
        const usernameIndexExists = indexes.some(idx => idx.name === "username_1");
        if (usernameIndexExists) {
            console.log("Dropping index 'username_1'...");
            await usersCollection.dropIndex("username_1");
            console.log("Index 'username_1' dropped successfully!");
        } else {
            console.log("Index 'username_1' does not exist.");
        }
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("Error dropping index:", error);
        process.exit(1);
    }
};

dropIndex();
