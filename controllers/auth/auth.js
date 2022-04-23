import User from "../../models/user.js";
import { validationResult } from'express-validator';
import bcrypt from'bcryptjs';
import jwt from'jsonwebtoken';


export const signup = async (req,res,next)=>{

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const hashedPw = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            name :req.body.name,
            email:req.body.email,
            password:hashedPw,
            phoneNumber:req.body.phoneNumber
        }); 
        const result = await user.save();
        return res.status(201).json("User created successfully !");
    }catch(err){
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    }
       
};

export const login  = async(req,res,next)=>{
    try{
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
          const error = new Error('A user with this email could not be found.');
          error.statusCode = 401;
          throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    
    if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
    }
    const token = jwt.sign(
        {
            user:user,
           
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '24h' }
        );
    return res.status(200).json({ token: token, user});
}catch(err){
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
}
}