const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post_id);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post_id,
        user: req.user._id,
      });
      //update data in the post
      post.comments.push(comment);
      //remember to save after pushing
      post.save();
      comment = await comment.populate("user", "name email _id").execPopulate();
      //  commentsMailers.newComment(comment);
      //   let job = queue.create("emails", comment).save(function (err) {
      //     if (err) {
      //       console.log("error in creating queue");
      //       return;
      //     }
      //     console.log(job.id);
      //   });
      return res.status(200).json({
        data: {
          comment: comment,
        },
        message: "Your comment is Published",
        success: true,
      });
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
