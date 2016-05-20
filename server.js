var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var UAParser = require('ua-parser-js');

app.get('/', function (req, res) {
	var returnJSON = {};
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.socket.connection.remoteAddress;
	/*
	Using the request object's connetion property which in turn is a net.Socket object which has the remoteAddress property, get the ip of the client
	Utilize ua-parser to get the OS of the browser
	Using the accept-language key in the req.headers object get the language of the browser
	*/
	var parser = new UAParser();
	var userAgent = req.headers['user-agent'];
	var os = parser.setUA(userAgent).getOS(); 
	var language = req.headers['accept-language'].match(/[a-zA-z\-]{2,10}/g) || [];
	returnJSON.ipAddress = ip;
	returnJSON.language = language;
	returnJSON.software = os.name + os.version;
	res.json(returnJSON);
});

app.listen(PORT, function () {
	console.log("The server has started on the port: "+PORT);
});