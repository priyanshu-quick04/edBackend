import express from "express";
import bodyParser from "body-parser";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const jwtSecret = process.env.JWT_SECRET;

//handling the signup user
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros_occured: errors.array() });
    }
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    // checking for user already present
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already Present" });
    }
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.userLocation,
      });
      return res.json({ message: "User Account Created Successfully" });
    } catch {
      return res
        .status(500)
        .json({ message: "Server error while creating account" });
    }
  }
);

//handling logging in the user
router.post("/loginuser", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userData = await User.findOne({ email });
    const pwdCompare = await bcrypt.compare(password, userData.password);
    if (!userData) {
      return res.status(400).json({ message: "No Such User found" });
    } else if (!pwdCompare) {
      return res.status(400), json({ message: "Wrong Password Entered" });
    }
    const data = {
      user: {
        id: userData._id,
      },
    };
    const authToken = jwt.sign(data, jwtSecret);
    return res
      .status(200)
      .json({ message: "Logged In Successfully", authToken: authToken });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;
