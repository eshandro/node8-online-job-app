var mongoose = require('mongoose');

var Applicant = mongoose.model('Applicant', {
	name: String,
	bio: String,
	skills: Array,
	yearsExp: Number,
	why: String,
});

module.exports = Applicant;