const global = require("../config/global");
const Publication = require("../models/publication");
const User = require("../models/user");
const mongoose = require("mongoose");
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

            //SEGUIDORES ALEATORIOS
            let followings = await User.findById(req.session.user).select("following").populate("following","name lastname picture").lean();
            followings = followings.following.sort(() => Math.random() - 0.5).slice(0,10);

            res.render("main/index", {
                profile: await User.findById(req.session.user).select("name lastname picture").lean(),
                lastPublications,
                selfId: req.session.user,
                followings
            });
        });
    },
};
