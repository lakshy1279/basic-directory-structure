const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=async function(req,res)
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
   let posts=await Post.find({}).populate('user').populate(
     {
       path:'comments',
       populate:{
         path:'user'
       }
     })
     let users=await User.find({});
     return res.render('home',
      {
        title:"Codeial|home",
        posts:posts,
        all_users:users
      });
}