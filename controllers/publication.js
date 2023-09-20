const Publication = require("../models/publication");
require("../config/db");

module.exports = {
    new: function (req, res) {
        const errors = [];
        console.log(req.files.length);

        if (req.body.description.replace(/\s/g,"") === ""){ //COMPRUEBA SI EL DESCRIPTION ESTE VACIO
            if (req.files.length > 0) { //COMPRUEBA SI SE SUBIERON FOTOS
                savePublication();
            }else{
                res.redirect("/")
            }
        }else{
            savePublication();
        }

        async function savePublication() {
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
        }
    },
};
