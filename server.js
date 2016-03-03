var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multiPart = require('connect-multiparty');
var multiPartMiddleware = multiPart();

var app = express();
var authenticationController = require('./server/controllers/authenticationController');
var profileController = require('./server/controllers/profileController')

mongoose.connect('mongodb://localhost:27017/social-network');

app.use(multiPartMiddleware);
app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

//-------------->Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);

//Profile
app.post('api/profile/editPhoto', multiPartMiddleware, profileController.updatePhoto);

app.listen('3000', function() {
	console.log("Listening for local host 3000!");
})