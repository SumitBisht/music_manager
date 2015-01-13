var server = 'http://localhost:3000/';
var lastSong = null;
var startTheData = function(){
	setInterval(function(){ getMetaData()}, 60000);
};
var getMetaData = function(){
	var url = document.getElementsByName("URL")[0].value;
	var millis = (new Date().getTime()).toString();
	var serverURL = server + 'url';
	// url = serverURL + url;
	console.log('POST URL: '+serverURL);

	 $.ajax({
        url: serverURL,
        type: 'POST',
        timeout: 15000,
        data: {choice: url},
        cache: false,
        success: function(result) {
        	console.log('success: Data- '+JSON.stringify(result));
        	lastSong = result;
            $('#resultingMetaData').html('Currently Playing song: '+result['song']);
            $('#player').html('<audio src="'+url+';" controls autoplay></audio>');
            $('#player').append('<br/ ><button onclick="saveSong()">Save song</buton>');

        },
        faliure: function(result) {
        	console.log('failure: Data- '+JSON.stringify(result));
        	$('#resultingMetaData').html(result);
        	lastSong = null;
        }
    });
};

var saveSong = function(){
	var saveURL = server+'db/saveInfo';
	var song = $('#resultingMetaData').html().split(':')[1];
	console.log('Saved the song: '+song);
	if(lastSong != null){
		lastSong['userAgent'] = navigator.userAgent;
		lastSong['created'] = Date.now;
		$.ajax({
	        url: saveURL,
	        type: 'POST',
	        data: lastSong,
	        cache: false,
	        success: function(result) {
	            $('#notifications').html('<br/><p> Song information saved </p>');
	        },
	        faliure: function(result) {
	        	console.log('failure: Data- '+JSON.stringify(result));
	            $('#notifications').html('<br/><p> Information not saved </p>');
	        	lastSong = null;
	        }
    	});
	}else{
		console.log('Last Song object not created, kindly refresh again.');
	    $('#notifications').html('<br/><p> Song information not present, please refresh. </p>');
	}
}