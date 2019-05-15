const express=require('express');
const router=express.Router();
const verify=require('../config/verify');
const order_controller=require('../controller/order.controller');



//getting all order.this should only be accessable by the admin or gallery
router.get('/',order_controller.getOrders)

// when new art order is made or adding  a new order
router.post('/',order_controller.newOrder) 

//getting an order 
router.get('/:orderid',order_controller.getOrder)

//deleting an order
router.delete('/:orderid',order_controller.deleteOrder)


module.exports=router;