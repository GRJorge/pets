const global = require("../config/global");
const Publication = require("../models/publication");
const User = require("../models/user");
const Tips = require("../models/tips");
const mongoose = require("mongoose");
require("../config/db");

module.exports = {
    viewHome: function (req, res) {
        global.ifSession(req, res, async () => {
            const date = new Date();
            //ULTIMAS PUBLICACIONES PROPIAS
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
            //PUBLICACIONES DE PERSONAS QUE SIGUES
            const followingsPub = await User.findById(req.session.user).select("following").lean(); //Obtener solo siguiendo
            
            let followingPublications = await Publication.find({
                user: {
                    $in: followingsPub.following
                },
                createdAt: {
                    $gte: date.setDate(date.getDate() - 4),
                },
            }).populate("user","name lastname picture").select("user description multimedia likes comments createdAt").lean();
            
            followingPublications = followingPublications.sort(() => Math.random() - 0.5);

            //SEGUIDORES ALEATORIOS
            let followings = await User.findById(req.session.user).select("following").populate("following", "name lastname picture").lean(); //Obtener siguiendo pupolado
            followings = followings.following.sort(() => Math.random() - 0.5).slice(0, 10); //Randomizar arreglo y cortar a solo los primeros 10

            //TIP ALEATORIO
            let tip = await Tips.find({}).lean();
            tip = tip[Math.floor(Math.random() * tip.length)].text;

            res.render("main/index", {
                profile: await User.findById(req.session.user).select("name lastname picture").lean(),//PERFIL
                lastPublications,//MIS ULTIMAS PUBLICACIONES
                selfId: req.session.user,
                followings, //QUIENES SE SIGUEN
                tip, //TIP ALEATORIO
                followingPublications, //PUBLICACIONES DE QUIENES SIGO
            });
        });
    },
};
