const mongoose=require('mongoose');

const orderSchema =mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    art:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Art',
        required:true
         }
   

})

module.exports=mongoose.model('Order',orderSchema);