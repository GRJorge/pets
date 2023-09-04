const bcrypt = require("bcryptjs");
const User = require("../models/user");
require("../config/db");

module.exports = {
    viewSignIn: function (req, res) {
        //VISTA DE LOGIN
        res.render("user/signIn");
    },
    viewSignUp: function (req, res) {
        //VISTA DE REGISTRO
        res.render("user/signUp");
    },
    insertUser: async function (req, res) {
        //GUARDADO DE USUARIOS
        const { name, lastname, email, day, month, year, password } = req.body;

        await bcrypt.hash(password, 8, (err, hash) => {
            if (err) throw err;

            new User({
                name: name,
                lastname: lastname,
                email: email,
                birthday: new Date(year + "-" + month + "-" + day),
                password: hash,
            }).save();

            res.send(req.body);
        });
    },
};
