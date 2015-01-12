var express = require('express');
// var request = require('request');
var router = express.Router();
var icecast = require("icecast");

/* GET the radio listing. */
router.get('/', function(req, res) {
	console.log('Calling the streaming data');
	res.render('radio', {'title':'Online Streaming Metadata Resolver'});
});

/* Process the internet audio stream */
router.post('/url', function(req, res){
	var url = req.body.choice;
	console.log(url);
	try{
	icecast.get(url, function(strm){
		var headers = strm.headers;
		// console.log(JSON.stringify(headers));
		console.log('content-type '+headers['content-type']);
		console.log('description '+headers['icy-description']);
		console.log('genre '+headers['icy-genre']);
		console.log('name '+headers['icy-name']);
		console.log('server '+headers['server']);

		strm.on('metadata', function(metadata){
			var data = icecast.parse(metadata);
			console.log('Song: '+data.StreamTitle);
			var info = {};
			info['song'] = data.StreamTitle;
			info['content-type'] = headers['content-type'];
			info['name'] = headers['icy-name'];
			info['genre'] = headers['icy-genre'];
			info['description'] = headers['icy-description'];
			info['server'] = headers['server'];
			res.send(info);
		});
		strm.on('error', function(err){
			res.send('error');
		});
	});
	}catch(err){
		res.send('Error occured: '+err);
	}
});

router.get('/audioplayer', function(req, res){
	res.render('player');
});

module.exports = router;
