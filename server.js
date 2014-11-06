var http = require('http');
var url = require('url');
var settings = require('./settings.json')

function start(router){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		router(pathname);
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('Hellow World');
		response.end();
	}
	http.createServer(onRequest)
		.listen(settings.port, function(){
			console.log('Listening on port ' + settings.port)
		});	
}

exports.start = start;