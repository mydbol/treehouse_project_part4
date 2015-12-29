
var profile=require('./profile.js');
var render=require('./renderer.js');
var querystring=require('querystring');
// if the url is "/"" and method is get server up the search template ie. homepage
var home=function(httpRequest,httpResponse){
	
	if(httpRequest.url === '/'){
		if(httpRequest.method.toLowerCase() === 'get'){
			httpResponse.writeHead(200,{'Content-Type' : 'text/html'});
			render.view('header',{},httpResponse);
			render.view('search',{},httpResponse);
			render.view('footer',{},httpResponse);
			httpResponse.end();
		}else{
			var body='';
			httpRequest.on("data", function(postbody){
				body+=postbody.toString();
			});
			httpRequest.on("end",function(){
				var params=querystring.parse(body);
				console.log(params.username);
				httpResponse.writeHead(303, {"Location" : "/"+params.username});
				httpResponse.end();
			});

			
		}	
	}
}
//2.  if the urls is "/...."   
var user=function(httpRequest,httpResponse){
	var userName=httpRequest.url.replace("/","");
			httpResponse.writeHead(200,{'Content-Type' : 'text/html'});
		if(userName.length > 0){
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
				console.log(error.message);
				var myerror={}
				myerror.message=error.message;
				render.view('header',{},httpResponse);
				render.view('error',myerror,httpResponse);
				render.view('search',{},httpResponse);
				render.view('footer',{},httpResponse);
				httpResponse.end();
			});

			//httpResponse.write(userName+'\n');
			
		}
	
	
}

module.exports.home=home;
module.exports.user=user;