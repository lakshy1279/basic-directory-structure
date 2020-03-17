const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res)
{
    Post.findById(req.body.post,function(err,post)
    {
        if(err)
        {
            console.log("error in finding user");
            return;
        }
        if(post)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment)
            {
                if(err)
                {
                    console.log("comment not post");
                    return;
                }
                console.log(post.comments);
                //update data in the post
                post.comments.push(comment);
                //remember to save after pushing
                post.save();
                res.redirect('/');
            });
        }
    });
}
//delete comment
module.exports.destroy=function(req,res)
{
    Comment.findById(req.params.id,function(err,comment)
    {
        //.id is used to convert the object to string
        if(comment.user==req.user.id||req.user.id==comment.post)
        {
            let postid=comment.post;
            comment.remove();
            // The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
            Post.findByIdAndUpdate(postid, {$pull: {comments:req.params.id}},function(err,post)
            {
                return res.redirect('back');
            });
        }
        else
        {
            return res.redirect('back');
        }
    });
}