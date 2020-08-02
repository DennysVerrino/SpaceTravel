var express = require("express");
var router = express.Router();
var VacationSpot = require("../models/vacationSpot");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//INDEX ROUTE - shows all vacationSpots that match the search
router.get("/vacationSpots", function(req, res){
	//Get all vacationSpots from DB that match the search
	var search = req.query.search;
	
	if(search.planet == ""){
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

// NEW ROUTE - create new VacationSpot
router.get("/vacationSpots/new", middleware.checkIfAdmin, function(req,res){
	res.render("vacationSpots/new.ejs");
});

// CREATE ROUTE - create new VacationSpot
router.post("/vacationSpots", middleware.checkIfAdmin, function(req,res){
	
	VacationSpot.create(req.body.vacationSpot, function(err, vacationSpot){
		if(err){
			console.log(err);
			res.redirect("/");
		} else {
			vacationSpot.rating = 0;
			vacationSpot.save();
			res.redirect("/vacationSpots/" + vacationSpot._id);
		}
	});
});

// EDIT ROUTE - edit VacationSpot
router.get("/vacationSpots/:id/edit", middleware.checkIfAdmin, function(req, res){
	//find vacationSpot with provided ID
	VacationSpot.findById(req.params.id, function(err, foundVacationSpot){
		if(err){
			console.log(err);
		} else {
			res.render("vacationSpots/edit.ejs", {vacationSpot: foundVacationSpot});
		}
	});
});

// UPDATE ROUTE - update VacationSpot
router.put("/vacationSpots/:id", middleware.checkIfAdmin, function(req, res){
	//update vacationSpot with provided ID
	VacationSpot.findByIdAndUpdate(req.params.id, req.body.vacationSpot, function(err, foundVacationSpot){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/vacationSpots/" + foundVacationSpot._id);
		}
	});
});

//DESTROY ROUTE - delete comment
router.delete("/vacationSpots/:id", middleware.checkIfAdmin, function(req,res){
	VacationSpot.findById(req.params.id, function(err, foundVacationSpot){
		if(err){
			console.log(err);
			res.redirect("/");
		} else {
			foundVacationSpot.comments.forEach(function(comment){
				Comment.findByIdAndRemove({_id: comment._id}, function(err){
					if(err){
						console.log(err);
					}
				}); 
			});	
				
			foundVacationSpot.remove({_id: req.params.id}, function(err){
				if(err){
					console.log(err);
					res.redirect("/");
				} else {
					res.redirect("/");
				}
			});	
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