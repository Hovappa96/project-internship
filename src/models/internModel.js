const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;


const internSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    collegeId:{
        required:true,
        type:ObjectId,
        ref:'college'
    },
    mobile :{
        type:Number,
        required:true,
        unique:true,
        match: [/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/, "Please fill a valid Mobile Number"]
    },
    isDeleted :{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})


module.exports = mongoose.model("intern", internSchema)