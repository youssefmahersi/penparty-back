import User from "../../models/user.js";
import Team from "../../models/team.js";
import { randomBytes } from "crypto";
import { validationResult } from'express-validator';
import teamExist from "../../utils/teamExist.js";
export const createTeam = async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const user = await User.findById(req.userId);
        const teams = await Team.find();
        if(!teamExist(teams,user.email)){
            const teamName = req.body.teamName;
             const tShirt = req.body.tShirt;
        
            const teamLink = randomBytes(8).toString("hex");
            const team = new Team({
                teamName,
                TeamLeader:{
                name:user.name,
                email:user.email,
                tShirt
            },
            teamMembers: [],
            teamLink
            })
            const result = await team.save();
            return res.status(200).json({message:"Team created successfully!",teamLink})
        }else{
            return res.status(400).json("You alerady created a Team !")
        }
        
    }
    catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


export const joinTeam = async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const teamLink = req.body.teamLink;
        const tShirt = req.body.tShirt;
        const user = await User.findById(req.userId);
        const team = await Team.findOne({teamLink});
        
        if(team){
            if(team.TeamLeader.email === user.email){
                return res.status(400).json("You are alerady the team leader !");
            }
            const findMember = team.teamMembers.find(member => member.email === user.email);
            if(findMember){
                return res.status(400).json("You alerady joined the team !");
            }
            if(team.teamMembers.length >= 3){
                return res.status(400).json("This team is full !");
            }
            team.teamMembers.push({
                name:user.name,
                email:user.email,
                tShirt
            })
            const result = team.save();
            return res.status(200).json({team});
        }else{
            return res.status(400).json("Team not found !")
        }
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
    
}