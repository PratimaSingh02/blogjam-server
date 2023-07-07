const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("refreshtoken", RefreshTokenSchema);