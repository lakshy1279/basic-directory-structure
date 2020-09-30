const express = require("express");
const passport = require("passport");
const router = express.Router();
const friendApi = require("../../../controller/api/v1/api_friend");
router.post("/create_friendship", friendApi.addfriend);
router.get(
  "/fetch_user_friends",
  passport.authenticate("jwt", { session: false }),
  friendApi.friend
);
router.post(
  "/remove_friendship",
  passport.authenticate("jwt", { session: false }),
  friendApi.destroy
);
module.exports = router;
