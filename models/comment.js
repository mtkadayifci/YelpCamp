var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    created: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Comment", schema);
