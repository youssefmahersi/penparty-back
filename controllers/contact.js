import Msg from "../models/message.js";
import { validationResult } from'express-validator';
export const contact = async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const msg = new Msg({
            email:req.body.email,
            name:req.body.name,
            msg : req.body.msg

        })
        const result = await msg.save();
        return res.status(200).send("message sent successfuly !");
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);  
    }
}