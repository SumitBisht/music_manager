var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/music');

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

module.exports = router;