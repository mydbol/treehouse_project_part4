
var profile=require('./profile.js');

var home=function(httpRequest,httpResponse){
	if(httpRequest.url === '/'){
		httpResponse.write('HEADER\n');
		httpResponse.write('SEARCH\n');
		httpResponse.end('FOOTER\n');
	}
}
	// if the url is "/"" and method is get server up the search template ie. homepage
	// if teh urls is "/" and methos is POST get the data redirect to "/:username" 
//2.  if the urls is "/...."  POST 
var user=function(httpRequest,httpResponse){
	var userName=httpRequest.url.replace("/","");
	if(userName.length > 0){
		httpResponse.writeHead(200,{'Content-Type' : 'text/plain'});
		httpResponse.write('HEADER'+'\n');
		// het the users profile data
		var studentProfile = new profile(userName);
		studentProfile.on("end", function(returnedJson){
			var values={
				avatarUrl:returnedJson.gravatar_url,
				javascriptPoints: returnedJson.points.JavaScript,
				name : returnedJson.name ,
				badges : returnedJson.badges.length
			}
			httpResponse.write(JSON.stringify(values)+'\n');
			httpResponse.end('FOOTER');
		});
		studentProfile.on("error", function(error){
			httpResponse.write(error.message+'\n');
			httpResponse.end('FOOTER');
		});

		//httpResponse.write(userName+'\n');
		
	}
}

module.exports.home=home;
module.exports.user=user;