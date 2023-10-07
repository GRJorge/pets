const User = require("../models/user");
require("../config/db");

module.exports = (server) => {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
        //USER//
        //SEGUIR USUARIOS
        socket.on("follow", async (_id, selfId) => {
            if (_id == selfId) {
                console.log("Los usuarios son los mismos");
            } else {
                // Añadir a seguidores al dueño del perfil
                await User.findByIdAndUpdate(_id, {
                    $push: { followers: selfId },
                });
                // Añadir a siguiendo al usuario conectado
                await User.findByIdAndUpdate(selfId, {
                    $push: { following: _id },
                });
            }
        });
    });
};
