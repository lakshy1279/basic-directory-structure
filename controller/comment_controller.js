const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require("../models/like");
const commentsMailers = require("../mailers/comment_mailer");
const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../config/kue");
module.exports.create = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });
      //update data in the post
      post.comments.push(comment);
      //remember to save after pushing
      post.save();
      comment = await comment.populate("user", "name email").execPopulate();
      //  commentsMailers.newComment(comment);
      let job = queue.create("emails", comment).save(function (err) {
        if (err) {
          console.log("error in creating queue");
          return;
        }
        console.log(job.id);
      });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "comment Created",
        });
      }
      req.flash("success", "comment created");
      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
//delete comment
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);
    //.id is used to convert the object to string
    if (comment.user == req.user.id || req.user.id == comment.post) {
      let postid = comment.post;
      comment.remove();
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });
      // The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
      let post = await Post.findByIdAndUpdate(postid, {
        $pull: { comments: req.params.id },
      });
      //send the comment id which was deleted back to the views
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "comment deleted",
        });
      }
      req.flash("success", "comment deleted");
      return res.redirect("back");
    } else {
      req.flash("error", "you are not allow to delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
