var mongoose = require("mongoose");

// SCHEMA SETUP
var vacationSpotSchema = new mongoose.Schema({
	name: String,
	station: String,
	type: String,
	guests: Number,
	bedrooms: Number,
	thumbnail: String,
	rating: Number,
	price: Number,
	details:
		{
			checkin: String,
			checkout: String,
			firstAid: String,
			wifi: String,
			bathtub: String,
			airCon: String,
			pets: String
		},
	description: String,
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
	
	
});



var VacationSpot = mongoose.model("VacationSpot", vacationSpotSchema);

module.exports = VacationSpot;