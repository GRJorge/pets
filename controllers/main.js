const global = require("../config/global");

module.exports = {
    viewHome: function (req, res) {
        global.ifSession(req,res,() => {
            res.render("main/index")
        })
    },
};
