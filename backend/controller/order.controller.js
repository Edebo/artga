const Order=require('../models/order.model');
const mongoose=require('mongoose');
const Art=require('../models/art.model');

exports.getOrders=(req,res,next)=>{
    Order.find()
    .populate('art','name','gallery','artist')
    .then(results=>{
        console.log(results)
        res.status(201).json(results)
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    }

exports.newOrder=(req,res,next)=>{

    Art.findById(req.body.id)
    .then(art=>{
        if(!art){
            return res.status(404).json(
                {
                    message:"product not found"
                }
            )
        }


    const order=new Order({
        _id:mongoose.Types.ObjectId(),
        artid:req.body.artid
        });

      return  order.save()       

    })
    .then(result=>{
        res.status(200).json({
            message:"order successful",
            order
        })
    })
    .catch(err=>{

        res.status(501).json({
            error:err
        }
        )
    })
        
}

exports.getOrder=(req,res,next)=>{
    const orderid=req.params.orderid;
    Order.finById(orderid)
    .populate('art')
    exec()
    .then(order=>{
        if(!order){
          return  res.status(404).json({
                message:"order not found"
            })
        }
        res.status(200).json(order)
        })
    .catch(err=>{
        res.status(404).json({
            message:"cannot order",
            error:err
        })
    })
}
exports.deleteOrder=(req,res,next)=>{
    Order.remove({_id:req.params.orderid})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"order succesfully deleted"
        })
    })
    .catch(err=>{
        res.status(500).json({
    
        });
    })
        }