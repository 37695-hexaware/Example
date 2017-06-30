var fs1= require('fs');
fs.readFile('demofile.txt','utf8',function(err,data){
  if(err) throw err;
  console.log(data);
});
