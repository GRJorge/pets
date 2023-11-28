const express = require("express");
const multer = require("multer");
const router = express.Router();

const controller = require("../controllers/publication");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/images/publications/");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage: storage })

router.post("/new", upload.array("multimedia",6),controller.new);
router.post("/delete/:id", controller.delete)

module.exports = router;
