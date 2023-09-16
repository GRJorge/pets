const Publication = require("../models/publication");
require("../config/db");

module.exports = {
    new: async function (req, res) {
        let files = [];

        req.files.forEach((file) => {
            files.push(file.filename);
        });

        await new Publication({
            user: req.session.user,
            description: req.body.description,
            multimedia: files,
        }).save();

        res.redirect("/");
    },
};
