const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res)
{
    try{
       let post= await Post.create(
            {
                content:req.body.content,
              user:req.user._id
            });
            // Post.find({}).populate('user')
            if(req.xhr)
            { 
                // .exec() is used with a query while .execPopulate() is used with a document
                post = await post.populate('user', 'name').execPopulate();
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message:"post Created"
                })
            }
            req.flash('success','Post Published!');
            return res.redirect('back');
    }catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
}
module.exports.destroy=async function(req,res)
{
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id)
            {
                post.remove();
             await Comment.deleteMany({post:req.params.id});
             if(req.xhr)
             {
                 return res.status(200).json(
                     {
                         data:{
                             post_id:req.params.id
                           },
                         message:"post deleted successfully"
                     });
             }
             req.flash('success','Post ans assosciated Comment deleted!');
             return res.redirect('back');
            }
            else
            {
                req.flash('error','You can not delte this Post');
                return res.redirect('back');
            }
    }catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
    
}