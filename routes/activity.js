import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { createTeam,joinTeam } from "../controllers/activity/activity.js";
import authMiddelware from "../utils/auth.middelware.js";


router.post("/create-team",[body('teamName').trim().notEmpty()
.withMessage('teamName is required').isLength({min:4})
.withMessage("teamName must contain at least 4 characters "),body('tShirt').notEmpty().withMessage('t-shirt is required')],authMiddelware,createTeam);

router.post("/join-team",[body('teamName').trim().notEmpty()
.withMessage('teamName is required').isLength({min:4})
.withMessage("teamName must contain at least 4 characters "),body('tShirt').notEmpty().withMessage('t-shirt is required')],authMiddelware,joinTeam);

export default router;