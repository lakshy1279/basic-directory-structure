const express=require('express');

const router=express.Router();
const friendController=require('../controller/friend_controller');
router.post('/add',friendController.addfriend);


module.exports=router;