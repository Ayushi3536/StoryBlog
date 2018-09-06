var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongose = require('mongoose');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public')); 

var api=require('./app/routes/api');
app.use('/api',api);
mongose.connect(config.database,function(err)
{
	if(err)
		console.log("error in connecting with database");
	else
		console.log("database successful connected");
});
app.get('*',function(req,res)
{
res.sendFile(__dirname + '/public/app/views/index.html');

});

app.listen(config.port, function(err){

	if(err)
		console.log("error");
	else
		console.log("listening on port 3000");
})