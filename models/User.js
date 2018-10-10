var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, default: ''},
    email: {type: String, default: ''},
    password: {type: String, default: ''}
});

module.exports = mongoose.model('user', UserSchema);