// ASSIGMENT 1
// DEPENDENCIES
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var fs = require('fs');
// create the server
var httpServer = http.createServer(function(request,response){
	// parse URL
	var parsedUrl = url.parse(request.url,true);
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');		
	// select handler function
	var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
	// construct the data object to send to the handler. 
	var data = null;
	chosenHandler(data,function(statusCode,payload){
		// set defaults
		statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
		payload = typeof(payload) == 'object' ? payload : {};
		// convert to string
		var payloadString = JSON.stringify(payload);
		// set json content type
		response.setHeader('Content-Type','application/json');
		// set status code
		response.writeHead(statusCode);
		// return
		response.end(payloadString);
	});
	
});
// start listening
httpServer.listen(3000,function(){
	console.log('The server is listening on port 3000');
});
// define the handlers
var handlers = {};
handlers.hello = function(data,callback){
	callback(200,{'message':'Hello from planet earth!'});
};
// not found handler
handlers.notFound = function(data,callback){
	callback(404)
};
// define router
var router = {
	'hello': handlers.hello
}