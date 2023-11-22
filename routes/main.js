const express = require("express");
const router = express.Router();

const controller = require("../controllers/main");

router.get("/", controller.viewHome);
router.post("/search", controller.generalSearch)

module.exports = router;
