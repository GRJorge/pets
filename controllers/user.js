const bcrypt = require("bcryptjs");
const User = require("../models/user");
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
                    name: name,
                    lastname: lastname,
                    email: email,
                    birthday: new Date(year + "-" + month + "-" + day),
                    password: hash,
                    picture : null
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
                    res.redirect("/");
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
};

function deleteSession(session) {
    if (session) {
        session.destroy((err) => {
            if (err) throw err;
        });
    }
}
