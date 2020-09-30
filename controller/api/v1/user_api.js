const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require("../../../config/environment");
const fs = require("fs");
const { use } = require("passport");
module.exports.createSession = async function (req, res) {
  try {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    return res.json(200, {
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret),
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
      },
      success: true,
      message: "sign in Successfully here is your token keep it safe!",
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
module.exports.create = async function (req, res) {
  try {
    console.log("enter");
    console.log(JSON.stringify(req.headers));
    if (req.body.password != req.body.confirm_password) {
      return res.json(422, {
        message: "password not matched",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json(422, {
        message: "user already exist",
      });
    }
    let newUser = await User.create(req.body);
    return res.json(200, {
      message: "Sign up successful, user created",
      success: true,
      data: {
        token: jwt.sign(newUser.toJSON(), env.jwt_secret),
        user: {
          name: newUser.name,
          email: newUser.email,
          _id: newUser._id,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
module.exports.update = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.json(422, {
        message: "password not matched",
      });
    }
    let user = await User.findById(req.body.id);
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save();
    return res.json(200, {
      message: "Sign up successful, user created",
      success: true,
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret),
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
module.exports.profile = async function (req, res) {
  try {
    console.log(req.params);
    let user = await User.findById(req.params.id);
    return res.json(200, {
      success: true,
      data: {
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
module.exports.getUsers = async function (req, res) {
  console.log(req.query.text);
  try {
    const regex = new RegExp(req.query.text, "i");
    const result = await User.find({
      name: regex,
    }).select("name");
    console.log(result);
    return res.status(200).json({
      success: true,
      data: {
        users: result,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
