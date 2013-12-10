var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Contest = new Schema({
    contestname : String,
    date : Date
});

Contest.plugin(passportLocalMongoose);

module.exports = mongoose.model('Contest', Contest);
