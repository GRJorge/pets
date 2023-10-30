const User = require("../models/user");
require("../config/db");

module.exports = {
    ifSession: function (req, res, fun) {
        if (req.session.user) {
            fun();
        } else {
            res.redirect("/user/signIn");
        }
    },
};
