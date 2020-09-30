const express = require("express");
const passport = require("passport");
const router = express.Router();
const likeApi = require("../../../controller/api/v1/api_like");
router.post(
  "/toggle",
  passport.authenticate("jwt", { session: false }),
  likeApi.toggleLike
);
module.exports = router;
