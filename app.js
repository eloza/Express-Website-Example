var bodyParser = require('body-parser');
var express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index',{title: 'Hello There!'});
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'username@email.com',
			pass: 'password'
		}
	});

	var mailOptions = {
		from: 'Your Name <yourName@gmail.com>',
		to: 'contact@email.com',
		subject: 'Website Contact Test',
		text: 'The message has the following details: Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>The message has the following details: </p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log('The server is running on port 3000');
