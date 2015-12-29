//Problem: Create an application that given a users name will get the users badged and points  for javascript
//Solution: 
// use node to get the profile server up data + template via http
//1. create an http server
var router=require('./router.js');
var http=require('http');
http.createServer(function(httpRequest,httpResponse){
	httpResponse.writeHead(200,{'Content-Type' : 'text/html'});
	router.home(httpRequest,httpResponse);
	router.user(httpRequest,httpResponse);
//	router.user(httpRequest,httpResponse);
}).listen(8080,'127.0.0.1');
//2. Handle "/" urls
	// request the data from treehouse 
	// on end render template and data
	// on error render error template