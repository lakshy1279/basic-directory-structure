const User=require('../models/user');
module.exports.profile=function(req,res)
{
    return res.render('user_profile',
    {
      title:"profile"
    });
}

//render sign up page
module.exports.signup=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',
    {
        title:"Codeial|sign up"
    });
}

//render sign in page
module.exports.signin=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    console.log(req.cookies);
    res.cookie('user_id',25);
    return res.render('user_sign_in',
    {
        title:"Codeial|sign in"
    });
}

//get the signup data

module.exports.create=function(req,res)
{
    console.log('enter');
   if(req.body.password!=req.body.confirm_password)
   {
       return res.redirect('back');
   }
   User.findOne({email: req.body.email},function(err,user)
   {
      if(err){console.log('error in finding user in signing up'); return}
      if(!user)
      {
          User.create(req.body,function(err,user)
          {
              if(err){console.log('error in creating user while signing up'); return}
              return res.redirect('/users/signin');
          });
      }
      else{
          return res.redirect('back');
      }
   });
}

//validate signin

module.exports.createSession=function(req,res)
{
    return res.redirect('/');
}

module.exports.destroySession=function(req,res)
{
    req.logout();
    return res.redirect('/');
}
