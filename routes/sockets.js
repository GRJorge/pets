const User = require("../models/user");
const Publication = require("../models/publication");
require("../config/db");

module.exports = (server) => {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
        /* USER */
        //SEGUIR USUARIOS
        socket.on("follow", async (_id, selfId) => {
            if (_id != selfId) {
                let follow = false;
                const following = await User.findById(selfId).select("following").lean();
                // Comprobar si ya se sigue, si es correcto eliminarlo
                const promises = following.following.map(async (user) => {
                    if (user == _id) {
                        await User.findByIdAndUpdate(selfId, { $pull: { following: _id } });
                        await User.findByIdAndUpdate(_id, { $pull: { followers: selfId } });
                        return true;
                    }
                    return false;
                });

                const results = await Promise.all(promises);
                follow = results.some((result) => result);
                // Si no se sigue se añade
                if (!follow) {
                    // Añadir a seguidores al dueño del perfil
                    await User.findByIdAndUpdate(_id, { $push: { followers: selfId } });
                    // Añadir a siguiendo al usuario conectado
                    await User.findByIdAndUpdate(selfId, { $push: { following: _id } });
                }
            }
        });
        /*---- PUBLICACIONES ----*/
        //LIKES
        socket.on("like", async (idPub, selfId) => {
            const reactions = await Publication.findById(idPub).select("likes").lean();

            let liked = false;

            for (const like of reactions.likes) {
                if(like == selfId){
                    liked = true;
                    break;
                }
            }

            if(!liked){
                await Publication.findByIdAndUpdate(idPub, {
                    $push: { likes: selfId },
                });
            }else{
                await Publication.findByIdAndUpdate(idPub, {
                    $pull: { likes: selfId }
                })
            }
        });
    });
};
