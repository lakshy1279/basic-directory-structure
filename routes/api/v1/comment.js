const express = require("express");
const passport = require("passport");
const router = express.Router();
const commentApi = require("../../../controller/api/v1/api_comment");
router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentApi.create
);
module.exports = router;
