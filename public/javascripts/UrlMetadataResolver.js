var startTheData = function(){
	setInterval(function(){ getMetaData()}, 60000);
};
var getMetaData = function(){
	var url = document.getElementsByName("URL")[0].value;
	var millis = (new Date().getTime()).toString();
	var serverURL = 'http://localhost:3000/radio/url';
	// url = serverURL + url;
	console.log('POST URL: '+serverURL);

	 $.ajax({
        url: serverURL,
        type: 'POST',
        timeout: 15000,
        data: {choice: url},
        cache: false,
        success: function(result) {
        	console.log('success: Data- '+result);
            // saveData(result);
            $('#resultingMetaData').html(result);
            $('#player').html('<audio src="'+url+';" controls autoplay></audio>');

        },
        faliure: function(result) {
        	console.log('failure: Data- '+result);
        	$('#resultingMetaData').html(result);
        }
    });
};