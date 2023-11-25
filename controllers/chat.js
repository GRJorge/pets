const User = require("../models/user");
const Chat = require("../models/chat");
const global = require("../config/global");
require("../config/db");

module.exports = {
    viewChat: function (req, res) {
        global.ifSession(req, res, async () => {
            if (req.params.id != "home") {
                const searchInitProfile = await Chat.find({
                    $or: [{ userOne: req.params.id }, { userTwo: req.session.user }, { userOne: req.session.user }, { userTwo: req.params.id }],
                });

                if (searchInitProfile.length == 0) {
                    await new Chat({
                        userOne: req.session.user,
                        userTwo: req.params.id,
                        msgs: [
                            {
                                sender: req.session.user,
                                msg: "",
                            },
                        ],
                    }).save();
                }
            }

            //OBTENER TODOS LOS CHATS
            const chats = await Chat.find({
                $or: [{ userOne: req.session.user }, { userTwo: req.session.user }],
            })
                .sort({ updateAt: -1 })
                .select("userOne userTwo msgs")
                .populate("userOne userTwo", "name lastname picture")
                .lean();
            //ARREGLAR JSON
            for (const chat of chats) {
                //ELIMINAR MI PROPIO USUARIO
                if (chat.userOne._id.toString() == req.session.user) {
                    chat.user = chat.userTwo;
                } else {
                    chat.user = chat.userOne;
                }

                delete chat.userOne;
                delete chat.userTwo;
                //OBTENER ULTIMO MENSAJE
                delete chat.msgs._id;
                chat.lastMsg = chat.msgs[chat.msgs.length - 1];
                delete chat.msgs;
            }

            res.render("chat", { initUserId: req.params.id, chats, selfId: req.session.user });
        });
    },
};
