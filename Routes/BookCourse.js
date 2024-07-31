import express from "express";
import bodyParser from "body-parser";
import Course from "../models/Courses.js";
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//handling the course booking for a particular user
router.post("/bookcourse", async (req, res) => {
  const data = req.body;
  let emailId = await Course.findOne({ email: req.body.email });
  if (emailId == null) {
    try {
      await Course.create({ email: data.email, details: data.course_details });
      res.json({ success: true });
    } catch (error) {
      res.json({
        success: false,
        message: `Following error occured:- ${error}`,
      });
    }
  } else {
    try {
      await Course.findOneAndUpdate(
        { email: req.body.email },
        { $push: { details: data.course_details[0] } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.status(400).send("Server Error");
    }
  }
});

export default router;
