var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    rank: Number,
    steam: {
        id: String,
        displayName: String,
        profileURL: String,
        avatarSmallURL: String,
        avatarMediumURL: String,
        avatarLargeURL: String,
        personState: String
    }
});

module.exports = mongoose.model('User', userSchema);
