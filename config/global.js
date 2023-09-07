module.exports = {
    ifSession: function (req, res, fun) {
        if (req.session.user) {
            fun();
        } else {
            res.redirect("/user/signIn");
        }
    },
};
