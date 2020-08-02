var express = require("express");
var router = express.Router();
var VacationSpot = require("../models/vacationSpot");

//INDEX ROUTE - shows all vacationSpots that match the search
router.get("/vacationSpots", function(req, res){
	//Get all vacationSpots from DB that match the search
	var search = req.query.search;
	
	if(search.planet == undefined){
		VacationSpot.find({}, function(err, vacationSpots){
			if(err){
				console.log(err);
			} else{
				search.planet ="all available planets";
				res.render("vacationSpots/index.ejs", {vacationSpots: vacationSpots, search: search});	
			}
		});
	} 
	else {
		if(search.guestNum == ""){
			VacationSpot.find({name: search.planet}, function(err, vacationSpots){
				if(err){
					console.log(err);
				} else{
					res.render("vacationSpots/index.ejs", {vacationSpots: vacationSpots, search: search});	
				}
			});
		} else {
			VacationSpot.find({name: search.planet, guests: search.guestNum}, function(err, vacationSpots){
				if(err){
					console.log(err);
				} else{
					res.render("vacationSpots/index.ejs", {vacationSpots: vacationSpots, search: search});	
				}
			});
		}
	}
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