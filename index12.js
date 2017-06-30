
var fs = require('fs');
fs.readFile('./test.txt', 'utf8', function(err, data) {
  // the data is passed to the callback in the second argument
  console.log(data);
});



















/*

var config = {
  foo: 'bar'
};
module.exports = config;
*/
