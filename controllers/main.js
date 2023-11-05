const global = require("../config/global");
const Publication = require("../models/publication");
const User = require("../models/user");
const Tips = require("../models/tips");
const mongoose = require("mongoose");
require("../config/db");

module.exports = {
    viewHome: function (req, res) {
        global.ifSession(req, res, async () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            //ULTIMAS PUBLICACIONES PROPIAS
            const lastPublications = await Publication.find({
                user: req.session.user,
                createdAt: {
                    $gte: new Date().setDate(today.getDate() - 2),
                },
            })
                .sort({ createdAt: -1 })
                .select("user description multimedia likes comments createdAt")
                .populate("user", "name lastname picture")
                .lean();

            addIsLiked(lastPublications);

            //PUBLICACIONES DE PERSONAS QUE SIGUES
            const followingsPub = await User.findById(req.session.user).select("following").lean(); //Obtener solo siguiendo

            let followingPublications = await Publication.find({
                user: {
                    $in: followingsPub.following,
                },
                createdAt: {
                    $gte: new Date().setDate(today.getDate() - 4),
                },
            })
                .populate("user", "name lastname picture")
                .select("user description multimedia likes comments createdAt")
                .lean();

            addIsLiked(followingPublications);

            followingPublications = followingPublications.sort(() => Math.random() - 0.5);

            //PUBLICACIONES GENERALES (PERSONAS QUE NO SIGUES)
            followingsPub.following.push(req.session.user);

            let generalPublications = await Publication.find({
                user: {
                    $nin: followingsPub.following,
                },
                createdAt: {
                    $gte: new Date().setDate(today.getDate() - 4),
                },
            })
                .populate("user", "name lastname picture")
                .select("user description multimedia likes comments createdAt")
                .lean();

            addIsLiked(generalPublications);

            generalPublications = generalPublications.sort(() => Math.random() - 0.5);

            //SEGUIDORES ALEATORIOS
            let followings = await User.findById(req.session.user).select("following").populate("following", "name lastname picture").lean(); //Obtener siguiendo pupolado
            followings = followings.following.sort(() => Math.random() - 0.5).slice(0, 10); //Randomizar arreglo y cortar a solo los primeros 10

            //FOTO DEL DIA
            const topPhoto = await Publication.find({
                createdAt: {
                    $gte: today,
                },
                multimedia: {
                    $ne: [],
                },
                likes: {
                    $ne: [],
                },
            })
                .populate("user", "name lastname")
                .select("multimedia likes")
                .lean();

            addIsLiked(topPhoto);

            let moreLikePhoto = topPhoto[0];

            for (const top of topPhoto) {
                if (top.likes.length > moreLikePhoto.likes.length) {
                    moreLikePhoto = top;
                }
            }

            console.log(topPhoto);

            //TIP ALEATORIO
            let tip = await Tips.find({}).lean();
            tip = tip[Math.floor(Math.random() * tip.length)].text;

            res.render("main/index", {
                profile: await User.findById(req.session.user).select("name lastname picture").lean(), //PERFIL
                lastPublications, //MIS ULTIMAS PUBLICACIONES
                selfId: req.session.user,
                followings, //QUIENES SE SIGUEN
                tip, //TIP ALEATORIO
                followingPublications, //PUBLICACIONES DE QUIENES SIGO
                generalPublications, //PUBLICACIONES GENERELES
                moreLikePhoto, //FOTO DEL DIA
            });

            function addIsLiked(query) {
                for (const publication of query) {
                    publication.isLiked = publication.likes.toString().includes(req.session.user);
                }
            }
        });
    },
};
