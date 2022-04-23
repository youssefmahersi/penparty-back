import mongoose from "mongoose";

const Schema = mongoose.Schema;


const teamSchema = new Schema({
    teamName :{type:String,required:true},
    TeamLeader :{
        type: Object,
        required:true
    },
    teamMembers :{
        type:Array,
        required:true
    },
    teamLink:{type:String,required:true}
});



export default mongoose.model("Team",teamSchema);