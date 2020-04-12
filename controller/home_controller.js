const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=async function(req,res)
{
  console.log(req.user);
  // Post.find({},function(err,post)
  // {
  //   return res.render('home',
  //   {
  //     title:"Codeial|home",
  //     posts:post
  //   });
  // });
  // Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). 
   try{
    let posts=await Post.find({}).sort('-createdAt').populate('user').populate(
      {
        path:'comments',
        populate:{
          path:'user'
        },
        populate:{
          path:'likes'
        }
      }).populate('likes');
      let users=await User.find({});
      if(req.user!=undefined)
      {
        let user=await User.findById(req.user.id).populate({
          path:'friend',
          populate:{
            path:'from_user'
          }
        }).exec();
        return res.render('home',
        {
         title:"Codeial|home",
         posts:posts,
         all_users:users,
         friends:user.friend
        });
      }
      else
      {
        return res.render('home',
       {
         title:"Codeial|home",
         posts:posts,
         all_users:users,
        //  friends:user.friend
       });
      }
      // console.log(user.friend);
   }catch(err)
   {
     console.log('Error',err);
     return;
   }
}
// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
