const global = require("../config/global");
const Publication = require("../models/publication");
const mongoose = require("mongoose")
require("../config/db");

module.exports = {
    viewHome: function (req, res) {
        global.ifSession(req, res, async () => {
            const date = new Date();
            //ULTIMAS PUBLICACIONES
            const lastPublications = await Publication.find({
                user: req.session.user,
                createdAt: {
                    $gte: date.setDate(date.getDate() - 2),
                },
            })
                .sort({ createdAt: -1 })
                .select("user description multimedia likes comments createdAt")
                .populate("user", "name lastname picture")
                .lean();

            for (const publication of lastPublications) {
                publication.isLiked = publication.likes.toString().includes(req.session.user);
            }

            res.render("main/index", {
                barProfile: await global.getPictureProfile(req.session),
                lastPublications,
                selfId: req.session.user,
            });
        });
    },
};
