const { Schema, model, ObjectId } = require("mongoose");

const publicationSchema = new Schema(
    {
        user: { type: ObjectId, ref: "User", required: true },
        description: String,
        multimedia: [String],
        likes: [{ type: ObjectId, ref: "User" }],
        comments: [{
            user: { type: ObjectId, ref: "User", required: true },
            text: { type: String, required: true },
        }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Publication", publicationSchema);
