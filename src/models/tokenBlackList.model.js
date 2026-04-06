const mongoose = require("mongoose");

const tokenBlackListSchema = new mongoose.Schema({
    token: {
        type: String,
        require: [true, "Token is required to be added in balckList"],
    }
}, {
    timestamps: true
})

const tokenBlackListModel = mongoose.model("tokenBlackList", tokenBlackListSchema)

module.exports = tokenBlackListModel