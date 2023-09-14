const express = require("express");
const multer = require("multer");
const router = express.Router();

const controller = require("../controllers/user");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", (req, res) => {
    res.redirect("/user/signIn");
});
router.get("/signIn", controller.viewSignIn); //VISTA DE LOGIN
router.get("/signUp", controller.viewSignUp); //VISTA DE REGISTRO
router.post("/signIn", controller.signIn); //INICIO DE SESION
router.post("/signUp", controller.singUp); //REGISTRO DE USUARIO
router.post("/skipAddPicture", controller.skipAddPicture); //OMITIR AGREGAR FOTO DE PERFIL
router.post("/changePicture", upload.single("picture"), controller.changePicture); //CAMBIAR FOTO DE PERFIL

module.exports = router;
