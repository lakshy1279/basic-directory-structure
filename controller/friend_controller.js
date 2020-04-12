const User=require('../models/user');
const Friend=require('../models/friend');
module.exports.addfriend=async function(req,res)
{
    try{
        
        let fromUser=await User.findById(req.query.from);
        let ToUser=await User.findById(req.query.to);
        // console.log(fromUser);
        // console.log(ToUser);
        let friend=await Friend.create({
            from_user:fromUser,
            to_user:ToUser
        });
        fromUser.friend.push(friend._id);
        fromUser.save();
        ToUser.friend.push(friend._id);
        ToUser.save();
        ToUser=await ToUser.populate(
            {
                path:'friend',
                populate:{
                  path:'from_user'
                }
            }
        ).execPopulate();
        return res.json(200,{
            data:{
                user:ToUser.friend
            },
            message:"sucessful"
        })
    }catch(err)
    {
        console.log('error',err);
        return res.json(500,{
            message:'interval server error'
        });
    }
}