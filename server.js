var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multiParty = require('connect-multiparty');
var multiPartMiddleware = multiParty();

var app = express();
var authenticationController = require('./server/controllers/authenticationController');
var profileController = require('./server/controllers/profileController')

mongoose.connect('mongodb://localhost:27017/social-network');

app.use(bodyParser.json());
app.use(multiPartMiddleware);
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

//-------------->Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

//Profile
app.post('/api/profile/editPhoto', multiPartMiddleware, profileController.updatePhoto);
app.post('/api/profile/updateUsername', profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

app.listen('3000', function() {
	console.log("Listening for local host 3000!");
})