const mongoose =require('mongoose');

const config=require('../config/database');


//user schema
const UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    usertype:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
  
});

module.exports=mongoose.model('User',UserSchema);

