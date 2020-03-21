// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
class postComments
{
    constructor(postId)
    {
        this.postId=postId;
        this.postContainer=$(`#post-${postId}`);
        this.newCommentForm=$(`#post-${postId}-comments-form`);
        this.createComment(postId);
        let self=this;
        // call for all the existing comments
        // $(' .delete-comment-button',this.postContainer).each(function()
        // {
        //     self.deleteComment($(this));
        // })
    }

}