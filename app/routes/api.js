var User  = require('../models/user');
var Story = require('../models/story');
var config = require('../../config');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var modules = require('module');
var jsonwebtoken = require('jsonwebtoken'); 
var secretKey= config.secretKey;
function createToken(user)
{
	var token = jsonwebtoken.sign(
		{
		id : user._id,
		name:user.name,
		username: user.username
		},
		secretKey,
		{
		expiresIn:1440
		}
	);
	return token; 
}
	var  api = express.Router();
	api.post('/signup',function(req,res)
	{
		console.log(req.body+"nanan");
		var user= new User(
		{
			name :req.body.name,
			username :req.body.username,
			password :req.body.password
      
		});
	    
	    var token =createToken(user);

	    console.log(req.body);
	
		user.save(function(err)
		{

			if(err)
			{
				res.send(err+""+user.name);

				return;
			}
			res.json({
                success:true,
				message:'User has been created',
                token:token
			});
		});
	});

	api.get('/users',function(req,res)
	{
		User.find({},function(err,users)
		{
                 if(err)
                 {
                 	console.log(err);
                 	return;
                 }
                 res.json(users);
		});
	});
	api.post('/login',function(req,res)
		{
			User.findOne({
				username : req.body.username

			}).select('name username password').exec(function(err,user)
			   {
			   	if(err) throw err;
			   	if(!user)
			   	{
			   		res.send({message:"User doesn't exist"});
			   	}
			   	else if(user)
			   	{
			   		var validPassword = user.compare(req.body.password);
			   		if(!validPassword){
			   			res.send({message : "invalid password"});
			   		}
			   		else
			   		{
                            var token= createToken(user);
                            res.json({
                            	success:true,
                            	message:"Successfully login!",
                            	token : token
                            });
			   		}
			   	}
			   });
		});
	api.use(function(req,res,next)
	{
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	    if(token)
	    {
	    	jsonwebtoken.verify(token,secretKey,function(err,decoded)
	    	{
	    		if(err)
	    		{
	    			res.status(403).send({success:false,message:"failed  to authenticate user"})

	    		}else
	    		{
	    			req.decoded = decoded;
	    			next();
	    		}	
	    	})
	    }else{
	    	res.status(403).send({success:false,message:"No token provided"});
	    }
	})
	
	api.route('/')
	.post(function(req,res)
		{
			
			var story= new Story(
		    {
			  creator:req.decoded.id,
              content:req.body.content,
	    	});
			story.save(function(err)
			{
				if(err)
				   {
					res.send(err);
                    return
                   }
                else
                res.json({message:"story created"});
			});
		})
	.get(function(req,res){
		Story.find({creator:req.decoded.id},function(err,stories)
		{
			if(err){
				res.send(err);
				return;
			   }
			res.json(stories);
		});

	});
	api.get('/me',function(req,res)
	{
		res.json(req.decoded);
	});
	module.exports=api;




