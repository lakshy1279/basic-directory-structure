const express = require("express");

const router = express.Router();
router.use("/", require("./comment"));
router.use("/posts", require("./post"));
router.use("/user", require("./user"));
router.use("/friendship", require("./friend"));
router.use("/likes", require("./like"));
module.exports = router;
