const User=require('../models/user');
module.exports.profile=function(req,res)
{
    User.findById(req.params.id,function(err,user)
    {
        return res.render('user_profile',
        {
          title:"profile",
          profile_user:user
        });
    });
    
}
module.exports.update=function(req,res)
{
    if(req.user.id==req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
        {
            req.flash('success','Updated!');
            return res.redirect('back');
        });
    }
    else
    {
        req.flash('error','Unauthorized')
        return res.status(401).send('Unauthorized');
    }
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
    // console.log(req.cookies);
    // res.cookie('user_id',25);
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
       req.flash('error','Password do not match');
       return res.redirect('back');
   }
   User.findOne({email: req.body.email},function(err,user)
   {
      if(err){console.log('error in finding user in signing up'); return}
      if(!user)
      {
          User.create(req.body,function(err,user)
          {
              if(err){req.flash('error',err); return}
              return res.redirect('/users/signin');
          });
          req.flash('success','User created successfully');
      }
      else{
          req.flash('success','You have signed up,login to continue');
          return res.redirect('back');
      }
   });
}

//validate signin

module.exports.createSession=function(req,res)
{
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res)
{
    req.logout();
    req.flash('success','You are logged out');
    return res.redirect('/');
}
