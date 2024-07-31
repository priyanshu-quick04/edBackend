import express from "express";
import bodyParser from "body-parser";
import Course from "../models/Courses.js";
import User from "../models/User.js";
import authenticateToken  from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/getdetails",authenticateToken,async (req, res) => {
  try {
    const userId = req.userId;
    const userExist = await User.findById(userId);
    if(!userExist){
      return res.status(404).json({error:'User not found'});
    }
    const userEmail = userExist.email;
    const user = await Course.findOne({email:userEmail});
    res.status(200).json({ details: user.details });
  } catch (error) {
    res.json(500).send({
      message: `Server error while retrieving user details, ${error}`,
    });
  }
});

export default router;
