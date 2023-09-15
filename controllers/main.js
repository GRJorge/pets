const global = require("../config/global");
const User = require("../models/user");
require("../config/db");

module.exports = {
    viewHome: function (req, res) {
        global.ifSession(req, res, async () => {
            const query = await User.findById(req.session.user).select("picture").lean()
            
            res.render("main/index",{ pictureProfile: query.picture });
        });
    },
};
