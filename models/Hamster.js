var mongoose = require('mongoose');

var HamsterSchema = new mongoose.Schema({
    title: {type: String, default: ''},
    description: {type: String, default: ''},
    url: {type: String, default: ''},
    votes: {type: Number, default: ''}, 
    avatarUrl: {type: String, default: ''},
    hamsterImageUrl: {type: String, default: ''}
});

module.exports = mongoose.model('hamster', HamsterSchema);