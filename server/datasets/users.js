var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	email: String, 
	password: String,
	image: String,
	username: String,
	bio: String
});