const express=require('express');
const router=express.Router();
const config=require('../config/database');
const verify=require('../config/verify');
const Art=require('../models/art.model');
const art_controller=require('../controller/art.controller');


//creating an art article .only an admin can create an art
router.post('/create',art_controller.createArt)

//get all arts
router.get('/',art_controller.getArts);

//this is to get list of art in a category
router.get('/category/:id',art_controller.getArtsByCategory)

//this is to get a particular art
router.get('/:id',art_controller.getArt);

//this is for users to like
router.post('/:id/likes',verify,art_controller.like)

//this is for users to comment
router.post('/:id/comments',verify,art_controller.comments)

router.delete('/:id',art_controller.delete)
  
router.get('/latest',art_controller.latest)
   



module.exports=router;