var mongoose = require('mongoose');

var Post = require('./post');

var threadSchema = mongoose.Schema({
    ownerId: String,
    title: String,
    description: String,
    date: Date
    posts: [
        type: Post
    ]
});

module.exports = mongoose.model('Thread', threadSchema);
