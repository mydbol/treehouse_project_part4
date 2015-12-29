var fs=require("fs");
var view=function(templateName,values,response){
	// open the template file
	var filecontents=fs.readFileSync('views/'+templateName+'.html',{encoding : "utf8"});
		//var compliedTemplate='';
			// replace insert the values
		for(current in values){
			//console.log(current +':'+values[current]);
			//console.log(filecontents.toString());
			filecontents=filecontents.replace('{{'+current+'}}',values[current]);
		
		}
		
	// return complied view
	response.write(filecontents);
		
}
module.exports.view=view;