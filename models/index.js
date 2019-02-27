const mongoose = require('mongoose');

mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/savemyspot");

module.exports.User = require('./user');
module.exports.Business = require('./business');
