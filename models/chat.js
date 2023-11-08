const { Schema, model, ObjectId } = require("mongoose");

const chatSchema = new Schema(
    {
        sender: { type: ObjectId, ref: "user", required: true },
        receiver: { type: ObjectId, ref: "user", required: true },
        msg: String,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Chat", chatSchema);
