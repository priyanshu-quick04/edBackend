import mongoose, { Schema } from "mongoose";

const CourseBooked = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  details: {
    type: Array,
    required: true,
  },
});

const Course = mongoose.model("Course", CourseBooked);

export default Course;
