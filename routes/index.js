const express=require('express');

const router=express.Router();
const homeController=require('../controller/home_controller');
router.get('/',homeController.home);
router.use('/users',require('./user'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comment'));
console.log('router loaded');

module.exports=router;