const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
    {
        userOne: { type: ObjectId, ref: "user", required: true },
        userTwo: { type: ObjectId, ref: "user", required: true },
        msg: String,
        multimedia: [String],
        sender: { type: ObjectIdd, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Chat", chatSchema);
