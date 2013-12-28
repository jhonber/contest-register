var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var User = new Schema({
    nickname : String,
    email : String
});

module.exports = mongoose.model('User', User);
