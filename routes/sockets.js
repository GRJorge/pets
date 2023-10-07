module.exports = (server) => {
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
        //USER
        socket.on("follow", async (_id) => {
            console.log("follow " + _id);
        });
    });
};
