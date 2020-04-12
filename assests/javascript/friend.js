class Friend
{
    constructor(friend)
    {
        this.Friend=friend;
        this.createFriend();
    }
    createFriend()
    {
        let pself=this;
        $(this.Friend).click(function(e)
        {
            e.preventDefault();
            let self=this;
            $.ajax({
                type:'post',
                url:$(self).attr('href')
            }).done(function(data)
            {
                console.log(data);
                // let newFriend=newFriendDom(data.data.user);
                // $('#friends').prepend(newFriend);
            }).fail(function(err)
            {
                console.log('error in creating a friend');
            });
        });
    }
    // newFriendDom(friends)
    // {
    //        return $(`for(friend of friends){
    //         <p>
    //             <a href="/users/profile/${friend.from_user.email}">${friend.from_user.name}</a>
    //         </p>
    //        }`)
    // }
}