const User = require("../models/user");
require("../config/db");

module.exports = {
    viewSignIn: function (req, res) {
        res.render("user/signIn");
    },
    viewSignUp: function (req, res) {
        res.render("user/signUp");
    },
    insertUser: async function (req, res) {
        await newUserSchema(req.body).save();

        res.send("Guardado");
    },
};

function newUserSchema(body) {
    return new User(body);
}
