const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        birthday: { type: Date, required: true },
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        picture: { type: String, default: null },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model("User", userSchema);
