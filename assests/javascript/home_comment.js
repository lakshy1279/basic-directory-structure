// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
class PostComments
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
    createComment(postId)
    {
        let pself=this;
        this.newCommentForm.submit(function(e)
        {
            e.preventDefault();
            let self=this;

            $.ajax({
               type:'post',
               url:'/comments/create',
               data:$(self).serialize(),
               success:function(data)
               {
                  console.log(data);
               },
               error:function (error)
               {
                console.log(error.responseText);
               }
            });
        });
    }
}