const { Schema, model } = require("mongoose");

const tipsSchema = new Schema(
    {
        text: String,
    },
    {
        versionKey: false,
    }
);

module.exports = model("Tips",tipsSchema)
