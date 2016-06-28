var mongoose = require('mongoose');

var Post = require('./topic');

var threadSchema = mongoose.Schema({
    ownerId: String,
    title: String,
    shortDescription: String,
    date: Date
    topics: [
        type: topic
    ]
});
