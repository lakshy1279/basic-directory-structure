const express = require("express");
const passport = require("passport");
const router = express.Router();

const userApi = require("../../../controller/api/v1/user_api");
router.post("/create-session", userApi.createSession);
router.post("/signup", userApi.create);
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  userApi.update
);
router.get(
  "/fetch/:id",
  passport.authenticate("jwt", { session: false }),
  userApi.profile
);
router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  userApi.getUsers
);
module.exports = router;
