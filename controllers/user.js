const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Publication = require("../models/publication");
const global = require("../config/global");
const fs = require("fs");
require("../config/db");

module.exports = {
    viewSignIn: function (req, res) {
        //VISTA DE LOGIN
        deleteSession(req.session);

        res.render("user/signIn", { error: null, incorrectData: null });
    },
    viewSignUp: function (req, res) {
        //VISTA DE REGISTRO
        deleteSession(req.session);

        res.render("user/signUp", { error: null, incorrectData: {} });
    },
    singUp: function (req, res) {
        //GUARDADO DE USUARIOS
        const { name, lastname, email, day, month, year, password } = req.body;

        bcrypt.hash(password, 8, async (err, hash) => {
            if (err) throw err;

            try {
                await new User({
                    name: capitalizeName(name),
                    lastname: capitalizeName(lastname),
                    email: email.toLowerCase(),
                    birthday: new Date(year + "-" + month + "-" + day),
                    password: hash,
                    picture: null,
                }).save();

                res.render("user/signIn", {
                    error: null,
                    incorrectData: email,
                });
            } catch (error) {
                res.render("user/signUp", {
                    error: "Correo en uso",
                    incorrectData: req.body,
                });
            }
        });
    },
    signIn: async function (req, res) {
        //INICIO DE SESION
        const { email, password } = req.body;
        const query = await User.findOne({ email: email }).lean();

        if (query) {
            bcrypt.compare(password, query.password, (err, result) => {
                if (err) throw err;
                if (result) {
                    req.session.user = query._id;
                    if (query.picture == null) {
                        res.render("user/addPicture");
                    } else {
                        res.redirect("/");
                    }
                } else {
                    incorrect("Contraseña incorrecta", email);
                }
            });
        } else {
            incorrect("Correo incorrecto", email);
        }

        function incorrect(error, data) {
            res.render("user/signIn", { error: error, incorrectData: data });
        }
    },
    skipAddPicture: async function (req, res) {
        //OMICION DE GUARDADO DE FOTO DE PERFIL Y PUESTA FOTO POR DEFAULT
        const filter = { _id: req.session.user };
        const update = {
            $set: {
                picture: "default.jpg",
            },
        };

        await User.updateOne(filter, update);

        res.redirect("/");
    },
    changePicture: async function (req, res) {
        //CAMBIO DE IMAGEN DE PERFIL
        const oldPicture = await User.findById(req.session.user).select("picture").lean();

        const filter = { _id: req.session.user };
        const update = {
            $set: {
                picture: req.file.filename,
            },
        };

        await User.updateOne(filter, update);

        if (req.params.redirect == "main") {
            res.redirect("/");
        } else {
            if (oldPicture.picture != "default.jpg") {
                const routeImage = "public/images/profiles/" + oldPicture.picture;
                if (fs.existsSync(routeImage)) {
                    fs.unlinkSync(routeImage);
                }
            }

            res.redirect("/user/profile/" + req.session.user);
        }
    },
    viewProfile: function (req, res) {
        global.ifSession(req, res, async () => {
            const profile = await User.findById(req.params.id).select("name lastname picture").lean(); //OBTENCION DE INFORMACIÓN DEL PERFIL
            const publications = await Publication.find({ user: req.params.id })
                .select("user description multimedia likes comments createdAt")
                .populate("user", "name lastname picture")
                .sort({ createdAt: -1 })
                .lean(); //PUBLICACIONES DE LA PERSONA

            //AGREGAR SI SE LE DIO LIKE A LA PUBLICACION

            for (const publication of publications) {
                publication.isLiked = publication.likes.toString().includes(req.session.user);
            }

            const follows = await User.findById(req.params.id).select("followers following").populate("followers following", "name lastname picture").lean(); //SEGUIDORES Y SIGUIENDO

            let isFollow = false;
            //COMPROBAR SI SE SIGUE A LA PERSONA DEL PERFIL
            if (await User.findOne({ _id: req.session.user, following: req.params.id }).lean()) {
                isFollow = true;
            }

            //PERFIL DE USUARIO
            res.render("user/profile", {
                profile, //INFORMACION DEL PERFIL
                publications, //PUBLICACIONES DEL PERFIL
                selfId: req.session.user, //ID PROPIO
                isFollow, //SE SIGUE A LA PERSONA
                follows, //OBTENCION DE SEGUIDORES Y SEGUIDOS
            });
        });
    },
    viewEditProfile: function (req, res) {
        global.ifSession(req, res, async () => {
            const profile = await User.findById(req.session.user).select("email name lastname birthday picture createdAt updatedAt").lean();

            res.render("user/edit", {
                profile,
            });
        });
    },
    editName: async function (req, res) {
        const { name, lastname } = req.body;

        await User.findByIdAndUpdate(req.session.user, {
            name: capitalizeName(name),
            lastname: capitalizeName(lastname),
        });

        res.redirect("/user/edit");
    },
    editBirthday: async function (req, res) {
        const { year, month, day } = req.body;

        await User.findByIdAndUpdate(req.session.user, {
            birthday: new Date(year + "-" + month + "-" + day),
        });

        res.redirect("/user/edit");
    },
};

function deleteSession(session) {
    if (session) {
        session.destroy((err) => {
            if (err) throw err;
        });
    }
}

function capitalizeName(name) {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
