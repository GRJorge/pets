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
            const liked = await Publication.findOne({
                _id: idPub,
                likes: {
                    $elemMatch: {
                        $eq: selfId,
                    },
                },
            });

            if (!liked) {
                await Publication.findByIdAndUpdate(idPub, {
                    $push: { likes: selfId },
                });
            } else {
                await Publication.findByIdAndUpdate(idPub, {
                    $pull: { likes: selfId },
                });
            }
        });

        //COMENTARIOS
        socket.on("newComment", async (idPub, selfId, text) => {
            await Publication.findByIdAndUpdate(idPub, {
                $push: { comments: { user: selfId, text: text } },
            });
        });
        socket.on("onFillComments", async (idPub) => {
            const comments = await Publication.findById(idPub)
                .select("comments createdAt")
                .populate({ path: "comments", populate: { path: "user", select:"name lastname" } })
                .lean();
            
            socket.emit("fillComments", comments.comments)
        });
    });
};
