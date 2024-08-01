import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const mongodbURI = process.env.DATABASE_URL;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongodbURI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error while connecting to server");
  }
};

export { mongoDB };
