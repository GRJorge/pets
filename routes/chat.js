const express = require("express");
const router = express.Router();

const controller = require("../controllers/chat")

router.get("/:id", controller.viewChat);

module.exports = router;