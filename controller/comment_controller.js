const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req,res)
{
    try{
        let post=await Post.findById(req.body.post);
        if(post)
        {
            let comment=await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
                //update data in the post
             post.comments.push(comment);
                //remember to save after pushing
                post.save();
                if(req.xhr)
                {
                    comment = await comment.populate('user', 'name').execPopulate();
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },
                        message:"comment Created"
                    });
                }
                req.flash('success','comment created');
                res.redirect('/');
        }
    }catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
}
//delete comment
module.exports.destroy=async function(req,res)
{
    try{
        let comment=await Comment.findById(req.params.id);
        //.id is used to convert the object to string
        if(comment.user==req.user.id||req.user.id==comment.post)
        {
            let postid=comment.post;
            comment.remove();
            req.flash('success','comment deleted');
            // The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
            let post=await Post.findByIdAndUpdate(postid, {$pull: {comments:req.params.id}});
            return res.redirect('back');
        }
        else
        {
            req.flash('error','you are not allow to delete this post');
            return res.redirect('back');
        }
    }catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
    
}