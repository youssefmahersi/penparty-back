import express from "express";
import { body } from "express-validator";
const router  = express.Router();
import { contact } from "../controllers/contact.js";

router.post("/contact",[body("name").trim().notEmpty()
.withMessage('name is required')
.not()
.custom((val) => /[^A-za-z0-9\s]/g.test(val))
.withMessage('name not use uniqe characters')
.isLength({min:4})
.withMessage("name must contain at least 4 characters "),
body("email").isEmail()
.withMessage('Please enter a valid email.'),
body("msg").isLength({min:8})
.withMessage("message must contain at least 8 characters ")],contact);

export default router;