var querystring = require('querystring'),
	formidable = require('formidable'),
	fs = require('fs');

//var exec = require('child_process').exec;

/*function start(response){
	console.log('Request handler "start" was called.');
	exec('find /', { timeout: 4000, maxBuffer: 2*1024 },function(error, stdout, stderr){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('Response from the /start point' + '\n\n' + stdout);
		response.end();
	});
	
}*/

var logFilename = '[' + __filename + ']';

function start(response){
	console.log(logFilename, 'Request handler "start" was called.');
	var body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; ' +
		'charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/upload" method="post" enctype="multipart/form-data">' +
		'<textarea name="text" rows="20" cols="60"></textarea>' +
		'<input type="file" name="upload" multiple="multiple"><br>' +
		'<input type="submit" value="Submit text" />' +
		'</form>' +
		'</body>' +
		'</html>';

	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(body);
	response.end();
}

function upload(response, request){
	console.log(logFilename, 'Request handler "upload" was called.');

	var form = new formidable.IncomingForm();
	console.log(logFilename, 'About to parse...');

	form.parse(request, function(err, fields, files) {
		console.log(logFilename, 'Parsing done...');
		fs.rename(files.upload.path, '/tmp/Foto1.jpg', function(error){
			if(error){
				fs.unlink('/tmp/Foto1.jpg');
				fs.rename(files.upload.path, '/tmp/Foto1.jpg')	
			}
		});
	  	response.writeHead(200, {'content-type': 'text/html'});
	  	response.write('Received image: <br/>');
	  	response.write('<img src="/show" />');
	  	response.end();
	});

}

function show(response){
	console.log(logFilename, 'Request handler "show" was called.');
	response.writeHead(200, {'Content-Type': 'img/jpeg'});
	fs.createReadStream('/tmp/Foto1.jpg').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;