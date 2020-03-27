const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell the passport to use a new strategy for google login
passport.use(new googleStrategy({
   clientID:"697420632189-08hcjfqd9h4vggo52svrj0f5o7v2flo2.apps.googleusercontent.com",
   clientSecret:"4h0c4P5T3ocPjrOUWmuur5-L",
   callbackURL:"http://localhost:7000/users/auth/google/callback"
},
function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user)
    {
        if(err)
        {
            console.log("error in google passport strategy",err);
            return;
        }
        console.log(accessToken,refreshToken);
        console.log(profile);
        if(user)
        {
            //if found, set this user as req.user
             return done(null,user);
        }else
        {
            //if not found, create the user and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user)
            {
                if(err)
                {
                    console.log("error in google passport strategy",err);
                    return;
                }
                return done(null,user);
            });
        }
    });
}));

module.exports=passport;