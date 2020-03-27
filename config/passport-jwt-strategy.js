const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;

const User=require('../models/user');
 let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
 }
 passport.use(new JWTStrategy(opts, function(jwtpayload,done)
 {
     User.findById(jwtpayload._id, function(err,user)
     {
         if(user)
         {
             return done(null,user);
         }
         else{
             return done(null,flase);
         }
     });
 }));

module.exports=passport;