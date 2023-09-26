const global = require("../config/global");
const Publication = require("../models/publication");
require("../config/db");

module.exports = {
    viewHome: function (req, res) {
        global.ifSession(req, res, async () => {
            const date = new Date();
            //ULTIMAS PUBLICACIONES
            const lastPublications = await Publication.find({
                user: req.session.user,
                createdAt: {
                    $gte: date.setDate(date.getDate() - 1),
                },
            })
                .sort({ createdAt: -1 }).select("description multimedia createdAt")
                .populate("user","name lastname picture")
                .lean();

            res.render("main/index", {
                profile: await global.getPictureProfile(req.session),
                lastPublications,
            });
        });
    },
};
