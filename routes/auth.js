import express from "express";
const router = express.Router();
import { signup,login } from "../controllers/auth/auth.js";
import User from "../models/user.js";
import { body } from "express-validator";
router.post("/signup",[
    body("name").trim().notEmpty()
    .withMessage('name is required')
    .not()
    .custom((val) => /[^A-za-z0-9\s]/g.test(val))
    .withMessage('name not use uniqe characters')
    .isLength({min:4})
    .withMessage("name must contain at least 4 characters "),
    body("email").isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('E-Mail address already exists!');
        }
      });
    })
    .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage("password must contain at least 5 characters"),
      body("phoneNumber").custom((val)=> /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(val))
      .withMessage('Phone number not valid')
],signup);

router.post("/login",login)

export default router;