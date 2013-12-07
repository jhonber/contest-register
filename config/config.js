var path = require('path');

module.exports = {
    db: 'mongodb://localhost/test',
    root: path.normalize(__dirname + '/..'),
    app: {
      name: 'Contest Register'
    }
}
