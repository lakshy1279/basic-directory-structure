const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');
//authentication using passport
passport.use(new LocalStrategy(
    {
        usernameField:'email',
        passReqToCallback:true
        
    },
    function(req,email,password,done){
      //find the user and establish identity
       User.findOne({email:email},function(err,user)
       {
           if(err)
           {
              req.flash('error',err);
               return done(err);
           }

           if(!user || user.password!=password)
           {
               req.flash('error','Invalid Username/Password')
               return done(null,false,{ message: 'Incorrect password.' });
           }
           return done(null,user); 
       });
    }
));

//serializing the user to decide which key is to be kept in the cookies
//The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
passport.serializeUser(function(user,done)
{
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        if(err)
           {
               console.log('error in finding user --> Passport');
               return done(err);
           }

           return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next)
{
    //if the user is signed in then pass request to the next function(controller)
    if(req.isAuthenticated())
    {
        return next();
    }
   //if not authenticated
    return res.redirect('/users/signin');
}
passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.user contain the current information of signed in user and we are just sending this to local views
        res.locals.user=req.user;
    }
    return next();
}
module.exports=passport;