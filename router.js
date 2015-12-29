
var profile=require('./profile.js');
var render=require('./renderer.js')
// if the url is "/"" and method is get server up the search template ie. homepage
var home=function(httpRequest,httpResponse){
	if(httpRequest.url === '/'){
		render.view('header',{},httpResponse);
		render.view('search',{},httpResponse);
		render.view('footer',{},httpResponse);
		
		httpResponse.end();
	}
}
//2.  if the urls is "/...."  POST 
var user=function(httpRequest,httpResponse){
	var userName=httpRequest.url.replace("/","");
	if(userName.length > 0){
		httpResponse.writeHead(200,{'Content-Type' : 'text/html'});
		
		// het the users profile data
		var studentProfile = new profile(userName);
		studentProfile.on("end", function(returnedJson){
			var values={
				avatarUrl:returnedJson.gravatar_url,
				javascriptPoints: returnedJson.points.JavaScript,
				name : returnedJson.name ,
				badges : returnedJson.badges.length
			}
			//console.log(values);
			render.view('header',{},httpResponse);
			render.view('profile',values,httpResponse);
			render.view('footer',{},httpResponse);
			httpResponse.end();
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