var mongoose = require('mongoose');

var User = new mongoose.Schema({
    id: String,
    name : String
});

module.exports = mongoose.model('User', User);
