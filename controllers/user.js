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
        const user = newUserSchema(req.body);
        await user.save();

        res.send(req.body);
    },
};

function newUserSchema(body) {
    const { name, lastname, email, day, month, year, password } = body;

    return new User({
        name: name,
        lastname: lastname,
        email: email,
        birthday: new Date(day + "/" + month + "/" + year),
        password: password,
    });
}
