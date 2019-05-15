const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const  user_controller=require('../controller/user.controller');
const user_model=require('../models/user.model');
const config=require('../config/database');
const verify=require('../config/verify');
const mongoose=require('mongoose');



//register
router.post('/register',(req,res,next)=>{
let newUser=new user_model({
    _id:new mongoose.Types.ObjectId(),
    username:req.body.username,
    usertype:req.body.usertype,
    email:req.body.email,
    password:req.body.password
})

user_controller.addUser(newUser,(err,user)=>{
    if(err){
       res.status(500).json({
           error:err
       })
        
    }

    else{
        
        res.json(user);
    }
});
})

//authenticate user
router.post('/authenticate',(req,res,next)=>{
const username=req.body.username;
const password =req.body.password;

user_controller.getUserByUsername(username,(err,user)=>{
    if(err) throw err;

    if(!user){
       
      
      return  res.json({success:false,msg:'user not found'})
    }

    user_controller.comparePassword(password,user.password,(err,isMatch)=>{
        if(err) throw err;

        if(isMatch){
            const token=jwt.sign({user},config.secret,{
              expiresIn:60400// 1 week
            })

            res.json({
                success:true,
                token,
                user
            })
        }

        
        else{
           return  res.json({success:false,msg:'wrong password'})
        }

    })
})

});

router.get('/profile',verify,(req,res,next)=>{

res.json({user:req.user});
})


router.get('/',(req,res)=>{
    user_model.find()
    .then(users=>{
        
        res.status(200).json(users)
    }).catch(err=>{

        res.status(500).json({
            error:err
        })
    
    })

})




module.exports=router;