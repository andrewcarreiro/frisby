var express = require('express');
var app = express();

var count = 1;
app.get('/succeed-every-third-req', function (req, res) {
	if(count > 3){
		count = 1;
	}
	if( count == 3 ){
		res.status(200).send('ok');
	}else{
		res.status(404).send('nok');
	}
	count ++;
});

var countJSON = 1;
app.get('/succeed-every-third-req-json', function (req, res) {
	if(countJSON > 3){
		countJSON = 1;
	}
	if( countJSON == 3 ){
		res.status(200).json({ status : 'ok' });
	}else{
		res.status(404).json({ status : 'nok' });
	}
	countJSON ++;
});

var server = app.listen(1339);

module.exports = server;