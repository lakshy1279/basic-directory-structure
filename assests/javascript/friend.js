class Friend
{
    constructor(friend)
    {
        this.Friend=friend;
        this.createFriend();
    }
    createFriend()
    {
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
            }).fail(function(err)
            {
                console.log('error in creating a friend');
            });
        });
    }
}