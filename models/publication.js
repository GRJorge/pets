const { Schema, model } = require("mongoose");

const publicationSchema = new Schema(
    {
        user: { type: ObjectId, required: true },
        description: String,
        multimedia: [String],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("Publication", publicationSchema);
