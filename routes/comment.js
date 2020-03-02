const express=require('express');
const router=express.Router();
const passport=require('passport');
const CommentController=require('../controller/comment_controller');
router.post('/create',passport.checkAuthentication,CommentController.create);
router.get('/destroy/:id',passport.checkAuthentication,CommentController.destroy);
module.exports=router;