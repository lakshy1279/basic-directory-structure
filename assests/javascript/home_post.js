
{
    let createPost=function()
    {
        let newPostForm=$('#new-post-form');
         newPostForm.submit(function(e)
        {
           e.preventDefault();
           $.ajax({
            type:'post',
            url:'/posts/create',
            data:newPostForm.serialize(),
            success:function(data){
                console.log(data);
                let newPost=newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost));
                //calls the create comment class
                  new PostComments(data.data.post._id);
                 //enable the functionality of toggle like on new post
                 new ToggleLike(' .toggle-like-button',newPost);
                //doubt in this how request is passed
                new Noty({
                  theme: 'relax',
                  text: "Post published!",
                  type: 'success',
                  layout: 'topRight',
                  timeout: 1500
              }).show();
            },
            error:function(error)
            {
               console.log(error.response.Text);
            }
        });
    });
    }
    
    createPost();
    //method to create a post in dom
    let newPostDom=function(post)
      {
          return $(`<li id="post-${post._id}">
          <p>
            <small>
              <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
            </small>
            ${post.content}
            <br>
            ${post.user.name}
            <br>
            <small>
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
               0Likes
             </a>
            </small>
          </p>
          <div id="post-comments">
                  <form action="/comments/create" method="POST" id="post-${post._id}-comments-form">
              <input type="text" name="content" placeholder="type here to add comment....." required>
              <input type="hidden" name="post" value="${post._id }">
                  <input type="submit" value="Add comment"> 
                  </form>
              <div id="post-comment-list">
                <ul id="post-comments-${post._id}">
                 
                </ul>
              </div>
          </div>
          
        </li>
        `)
      }
     
      //Method to delete a post from domc
      let deletePost=function(delteLink){
          $(delteLink).click(function(e)
          {
              e.preventDefault();
              $.ajax({
                  type:'get',
                  url:$(delteLink).prop('href'),
                  success:function(data)
                  {
                    $(`#post-${data.data.post_id}`).remove();
                  },
                  error:function(error){
                    console.log(error.response.Text);
                  }
              })
          })
      }
      // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
      let convertPostToAjax=function()
      {
        // looping construct such as jQuery's .each()
        $('#posts-list-container>ul>li').each(function()
        {
          let self=$(this);
          let deleteButton=$(' .delete-post-button',self);
          deletePost(deleteButton);
          // get the post's id by splitting the id attribute
          // post-5e7642dcfb46882c8cc36066-before split
          //5e7642dcfb46882c8cc36066-after split
          let PostId=self.prop('id').split("-")[1];
           new PostComments(PostId);
          // console.log(PostId);
        })
      }
      convertPostToAjax();
}