
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
                let newPost=newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
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
              <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
            </small>
            <%}%>
            ${post.content}
            <br>
            ${post.user.name}
          </p>
          <div id="post-comments">
                  <form action="/comments/create" method="POST" >
              <input type="text" name="content" placeholder="type here to add comment....." required>
              <input type="hidden" name="post" value="${post._id }">
                  <input type="submit" value="Add comment"> 
                  </form>
              <%}%>
              <div id="post-comment-list">
                <ul id="post-comments-${post._id}">
                 
                </ul>
              </div>
          </div>
          
        </li>
        `)
      }
}