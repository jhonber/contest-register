var flash = require('connect-flash');
var tokens = require('./tokens');

module.exports = function(config,mongoose){
  // Connect mongoose
  mongoose.connect('mongodb://localhost/passport_local_mongoose_examples');
}
