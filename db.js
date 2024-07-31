import mongoose from "mongoose";
const mongodbURI =
  "mongodb+srv://quickfi0408:priyanshu@cluster0.i5quape.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongodbURI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error while connecting to server");
  }
};

export { mongoDB };
