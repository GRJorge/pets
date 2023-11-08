const User = require("../models/user");
const global = require("../config/global");
require("../config/db");

module.exports = {
    viewChat: function (req, res) {
        global.ifSession(req, res, async () => {
            if (req.params.id != "home") {
                const initChatProfile = await User.findById(req.params.id).select("name lastname picture").lean();

                res.render("chat", { initChatProfile, selfId: req.session.user });
            } else {
                res.render("chat", { initChatProfile: null, selfId: req.session.user });
            }
            //res.render("chat")
        });
    },
};
