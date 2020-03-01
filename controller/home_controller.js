const Post=require('../models/post');
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
    return res.render('home',
      {
        title:"Codeial|home",
        posts:post
      });
   });  
}