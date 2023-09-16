const { Schema, model, ObjectId } = require("mongoose");

const publicationSchema = new Schema(
    {
        user: { type: ObjectId, ref: "User", required: true },
        description: String,
        multimedia: [String],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Publication", publicationSchema);
