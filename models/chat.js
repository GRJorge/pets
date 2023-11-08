const { Schema, model, ObjectId } = require("mongoose");

const chatSchema = new Schema(
    {
        userOne: { type: ObjectId, ref: "user", required: true },
        userTwo: { type: ObjectId, ref: "user", required: true },
        msgs: [
            {
                sender: { type: ObjectId, required: true },
                msg: String,
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Chat", chatSchema);
