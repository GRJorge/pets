module.exports = {
    ifSession: function (session, res, fun) {
        if (session) {
            fun();
        } else {
            res.redirect("/");
        }
    },
};
