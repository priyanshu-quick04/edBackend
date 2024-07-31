import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
import { mongoDB } from "./db.js";
import createUserRoutes from "./Routes/CreaterUser.js";
import bookCourseRoutes from "./Routes/BookCourse.js";
import getUserDetail from "./Routes/GetUser.js";

mongoDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hey there! it is working");
    });

    app.use("/api", createUserRoutes);
    app.use("/api", bookCourseRoutes);
    app.use("/api", getUserDetail);
    app.listen(port, () => {
      console.log(`Server is up and running on ${port} port number`);
    });
  })
  .catch((error) => {
    console.log(`Error while connecting database , ${error}`);
  });
