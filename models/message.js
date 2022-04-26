import mongoose from "mongoose";

const Schema = mongoose.Schema;


const msgSchema = new Schema({
    email : {type:String,required:true},
    name: {type:String,required:true},
    msg : {type:String,required:true}
});



export default mongoose.model("Message",msgSchema);