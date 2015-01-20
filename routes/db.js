var express = require('express');
var router = express.Router();
var config = require('../config');

var mongoose = require('mongoose');
var serverUrl = 'mongodb://'+config.user+':'+config.pwd+'@'+config.host+':'+config.port+'/'+config.name;
mongoose.connect(serverUrl);

var Schema = mongoose.Schema;
var musicSchema = new Schema({
	instance : Schema.ObjectId,
	song: String,
	contentType: String,
	name: String,
	genre: String,
	description: String,
	server: String,
	userAgent: String,
	create: Date
});

var Music = mongoose.model('music', musicSchema);

router.post('/saveInfo', function(req, res) {
  var obj = new Music();
  obj.song = req.body['song'];
  obj.contentType = req.body['content-type'];
  obj.name = req.body['name'];
  obj.genre = req.body['genre'];
  obj.description = req.body['description'];
  obj.server = req.body['server'];
  obj.userAgent = req.body['userAgent'];
  obj.create = req.body['created'];
  obj.save();
  	// function(error){
  //   res.send('Unable to save');
  // });
  res.send('saveInfo completed..');
});

router.get('/list', function(req, res){
	Music.find({}, function (err, docs) {
		if(docs){
			res.render('data-list', {title: 'List of all Data', rows: docs});
		}
		if(err){
			res.render('error', {message:'Unable to list', error:err});
		}
	});
});

module.exports = router;
