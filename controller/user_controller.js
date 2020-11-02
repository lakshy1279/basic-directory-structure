const User = require("../models/user");
const Forgot = require("../models/password");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const env = require("../config/environment");
module.exports.forgotPassword = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    let token = await jwt.sign(user.toJSON(), env.jwt_secret);
    Forgot.create(user._id, token, true);
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    return res.render("user_profile", {
      title: "profile",
      profile_user: user,
    });
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
module.exports.update = async function (req, res) {
  // if(req.user.id==req.params.id)
  // {
  //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user)
  //     {
  //         req.flash('success','Updated!');
  //         return res.redirect('back');
  //     });
  // }
  // else
  // {
  //     req.flash('error','Unauthorized')
  //     return res.status(401).send('Unauthorized');
  // }
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("******Multer Error", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }

          //this is saving path of the uploaded file into the user avatr
          user.avatar = User.avatarpath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
        //  console.log(req.file);
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  }
};
//render sign up page
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial|sign up",
  });
};

//render sign in page
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  // console.log(req.cookies);
  // res.cookie('user_id',25);
  return res.render("user_sign_in", {
    title: "Codeial|sign in",
  });
};

//get the signup data

module.exports.create = function (req, res) {
  console.log("enter");
  if (req.body.password != req.body.confirm_password) {
    req.flash("error", "Password do not match");
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          req.flash("error", err);
          return;
        }
        return res.redirect("/users/signin");
      });
      req.flash("success", "User created successfully");
    } else {
      req.flash("success", "You have signed up,login to continue");
      return res.redirect("back");
    }
  });
};

//validate signin

module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "You are logged out");
  return res.redirect("/");
};
