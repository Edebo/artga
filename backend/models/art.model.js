const mongoose =require('mongoose');


//art schema

const artSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    gallery:{type:String,required:true},
    artist:{type:String,required:true},
    time:{type:Date,default:Date.now},
    category:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    likes:[{type:String}],
    comments:[
        {
        comment:String,
        time:{type:Date,default:Date.now},
        username:String }
    ]
},
{
    usePushEach : true
  }
 
);

module.exports=mongoose.model('Art',artSchema);