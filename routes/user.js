const express = require("express");
const multer = require("multer");
const router = express.Router();

const controller = require("../controllers/user");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/images/profiles/");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.redirect("/user/signIn");
});
router.get("/signIn", controller.viewSignIn); //VISTA DE LOGIN
router.get("/signUp", controller.viewSignUp); //VISTA DE REGISTRO
router.post("/signIn", controller.signIn); //INICIO DE SESION
router.post("/signUp", controller.singUp); //REGISTRO DE USUARIO
router.post("/skipAddPicture", controller.skipAddPicture); //OMITIR AGREGAR FOTO DE PERFIL
router.post("/changePicture/:redirect", upload.single("picture"), controller.changePicture); //CAMBIAR FOTO DE PERFIL

router.get("/profile/:id", controller.viewProfile); //PERFIL DE USUARIO
router.get("/edit", controller.viewEditProfile); //VISTA DE EDICION
router.post("/editName", controller.editName); //EDITAR NOMBRE

module.exports = router;
