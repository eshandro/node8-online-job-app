var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Applicant = require('./models/applicants.js');

mongoose.connect('mongodb://localhost/jobApplicants');



var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	Applicant.find({}, function(error, allApplicants) {
		if (error) {
			res.send(500, "There was an error accessing the applicants.")
		}
		else {
		res.render('applicants', {
			applicants: allApplicants,			
			})
		}
	});
});

// creates an applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	var skillsList = req.body.skills.split(',');
	var applicant = new Applicant( {
		name: req.body.name,
		bio: req.body.bio,
		skills: skillsList,
		yearsExp: req.body.years,
		why: req.body.why,
	})
	applicant.save();
	res.render('success')
});

// deletes an applicant
app.post('/delete-applicant', function(req, res) {
	var currentID = req.body.id;
	Applicant.findByIdAndRemove(currentID, function(error, applicant) {
		if (error) {
			res.send(500, "There was an error deleting the applicant.")
		}
		else {
			res.redirect('applicants')	
		}
	})
});

app.get('/:userid', function(req, res) {
	var currentApplicant = req. params.userid;
	Applicant.findById(currentApplicant, function(error, applicant) {
		res.render('currentApplicant', {
			applicant: applicant,
		})
	})
})

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
