const Art=require('../models/art.model');
const mongoose=require('mongoose');
const formidable=require('formidable');
const fs=require('fs');

exports.createArt=((req,res,next)=>{
  try{
    const form = new formidable.IncomingForm();
    form.uploadDir = "./uploads"
    form.keepExtensions = true;
   obj={};
    form.parse(req)
    .on('field', (name, field) => {
     // console.log('Field', name, field)
    obj[name]=field.name;
   })
   .on ('fileBegin', function(name, file){
     //rename the incoming file to the file's name
    //  file.path = req.rootpath +"uploads/" + file.name;
 })  
   .on('file', (image, file) => {
     // console.log('Uploaded file', name, file,file.type,file.size,file.path)
        // const oldpath=file.path;
        // const newpath="/home/debo/artga/backend/uploads"+file.name;
    
       obj[image]=file.name;
   })
   .on('aborted', () => {
     console.error('Request aborted by the user')
   })
   .on('error', (err) => {
     console.error('Error', err)
     throw err
   })
   .on('end', () => {
     
     obj._id=new mongoose.Types.ObjectId();
     obj.time=new Date();
     console.log(obj);
     const newart=new Art(obj);
     newart.save()
 .then(art=>{
     const response={
                 _id:art._id,                    
             }
             
             res.status(201).json({
                 message:"art created successfully",
                 response
             })
         }
     )
 .catch(err=>{
     res.status(500).json({
         error:err
     })
 })
  
   })
  }
  catch(e){
      console.log('this is the error',e)
  }

})


//getting all art
exports.getArts=((req,res,next)=>{
    Art.find()
     .exec()
     .then(result=>{
         console.log(result);
         res.status(200).json(result);
     })
     .catch(err=>{
         console.log(err); 
         res.status(500).json({
             error:err
         });
     })
 
 })


 //get all the art in a particualar category
 exports.getArtsByCategory=((req,res,next)=>{
  const id=req.params.id;
  Art.find({category:id})
  .exec()
  .then(result=>{
      console.log(result);
      res.status(200).json(result);

  })
  .catch(err=>{
      console.log(err);
      res.status(500).json({
          error:err
      })
  })

});

//get a particular art by id
exports.getArt=((req,res,next)=>{
  const id =req.params.id;

  Art.findById({_id:id})
  .exec()
  .then(result=>{
      console.log(result);
      res.status(200).json(result);
  })
  .catch(err=>{
  console.log(err);
  res.status(500).json({
      error:err
  }
      )    
  })

})

exports.like=((req,res,next)=>{
    console.log(req.params.id)
    console.log(req.userData.user._id)
    try{
        const id=req.params.id;
      const email=req.userData.user.email;
console.log(id,email);
  Art.findById({_id:id},(err,art)=>{

      if(err){
          res.status(500).json({
              error:err
          })
      }

                const index= art.likes.indexOf(email)
              
                //check whether to remove the like or add the like
                 index===-1?art.likes.splice(0,0,email): art.likes.splice(index,1)
                

                art.save((err, art) => {
                    if(err){
                        res.status(500).json({
                            error:err

                        })
                    }

                    else{
                        res.status(200).json(art)
                    }
                })
            }) 
        }
        catch(e){
            res.status(500).json({
                error:e
            })
        }  

})


exports.delete=(req,res,next)=>{
    const id=req.params.id;
    console.log(id);
    
        Art.findByIdAndDelete({_id:id}).then(result=>{
            res.status(200).json({
                result
            })

        }).catch()
        // Art.find()
        // .then(result=>{
        //     res.status(200).json(result);
        // })
        // .catch(err=>{
        //     console.log(err); 
        //     res.status(500).json({
        //         error:err
        //     });
          
    }

exports.latest=(req,res)=>{
    Art.find().exec().then(result=>{
        res.status(200).json({
            result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    })
    
}

exports.comments=((req,res,next)=>{
    const id=req.params.id;
        
    //for the comment
    const commentData={
        comment:req.body.comment,    
        time:new Date(),  
        username:req.userData.user.username
    }

    console.log(commentData)
    
    
    Art.findById({_id:id},(err,art)=>{
        
        if(err){
            res.status(500).json({
                error:err
            })
        }

        art.comments.push(commentData);
        art.save((err, art) => {
            if(err){
                res.status(500).json({
                    error:err

                })
         }

            else{
                res.status(200).json(art)
                        }
                    
        })
        

    })
   
})

//this is to get all category
// router.get('/category',(req,res,next)=>{

//     Art.find({}).distinct('category')
//     .exec()
//     .then(categories=>{
//         console.log(categories);
//         res.status(200).json(categories);
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         })
//     })

// })