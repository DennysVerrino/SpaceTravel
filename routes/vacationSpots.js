var express = require("express");
var router = express.Router();
var VacationSpot = require("../models/vacationSpot");

//INDEX ROUTE - shows all vacationSpots that match the search
router.get("/vacationSpots", function(req, res){
	//Get all vacationSpots from DB
	var searchTerm = req.query.planet.charAt(0).toUpperCase() + req.query.planet.slice(1).toLowerCase();
	
	VacationSpot.find({name: searchTerm}, function(err, vacationSpots){
		if(err){
			console.log(err);
		} else{
			res.render("vacationSpots/index.ejs", {vacationSpots: vacationSpots, searchTerm: searchTerm});	
		}
	});
});


//SHOW ROUTE - shows one specific vacationSpot
router.get("/vacationSpots/:id", function(req, res){
	//find the vacationSpot with provided ID
	//populate("comments") will change all comment ids with the actual comments
	//exec() will proceed with the given code
	VacationSpot.findById(req.params.id).populate("comments").exec(function(err, foundVacationSpot){
		if(err){
			console.log(err);
		} else{
			//render show template of that vacationSpot 
			res.render("vacationSpots/show.ejs", {vacationSpot: foundVacationSpot});	
		}
	});
});

module.exports= router;