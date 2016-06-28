var mongoose = require('mongoose');

var replySchema = mongoose.Schema({
    ownerId: String,
    description: String,
    date: Date
});

module.exports = mongoose.model('Reply', replySchema);
