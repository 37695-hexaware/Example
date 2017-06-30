var fs =require('fs');
fs.readFile('demofile.txt','UTF8',function(err,data){
 if(err) throw err;
 console.log("the data present is "+data);

});
