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
	icecast.get(url, function(strm){
		console.log(JSON.stringify(strm.headers));

		strm.on('metadata', function(metadata){
			var data = icecast.parse(metadata);
			console.log('Song: '+data.StreamTitle);
			res.send('Song found: '+data.StreamTitle);
		});
	});
});

module.exports = router;
