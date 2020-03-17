const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=function(req,res)
{
  // Post.find({},function(err,post)
  // {
  //   return res.render('home',
  //   {
  //     title:"Codeial|home",
  //     posts:post
  //   });
  // });
  // Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). 
   Post.find({}).populate('user').populate(
     {
       path:'comments',
       populate:{
         path:'user'
       }
     }).exec(function(err,post)
   {
     User.find({},function(err,users)
     {
      return res.render('home',
      {
        title:"Codeial|home",
        posts:post,
        all_user:users
      });
     });
    
   });  
}