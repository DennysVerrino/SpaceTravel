var express = require("express");
var router = express.Router();
var VacationSpot = require("../models/vacationSpot");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//-----------------------------------------------------------------------------------------------------------------------------------
// COMMENTS ROUTES

// //NEW ROUTE - comment form
// router.get("/vacationSpots/:id/comments/new", function(req, res){
// 	//find campground by id
// 	VacationSpot.findById(req.params.id, function(err, foundVacationSpot){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			res.render("comments/new.ejs", {vacationSpot: foundVacationSpot});	
// 		}
// 	})
// });

//CREATE ROUTE - create comment
router.post("/vacationSpots/:id/comments", middleware.isLoggedIn, function(req, res){
	//lookup vacation spot using id
	VacationSpot.findById(req.params.id).populate("comments").exec(function(err, foundVacationSpot){
		if(err){
			console.log(err);
			res.redirect("/vacationSpots/" + foundVacationSpot._id);
		} else {
			//create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {	
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.created = new Date();
					comment.save();
			
					//connect new comment to vacation spot
					foundVacationSpot.comments.push(comment);	
					foundVacationSpot.rating = calcVacationSpotRating(foundVacationSpot);
					
					foundVacationSpot.save();
					
					//redirect campground show page
					res.redirect("/vacationSpots/" + foundVacationSpot._id);
				}
			});
			
		}
	});
});

//EDIT ROUTE - edit comment
router.get("/vacationSpots/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			console.log(err);
		} else {
			res.render("comments/edit.ejs", {vacationSpot_id: req.params.id, comment: foundComment});
		}
	});
});

//UPDATE ROUTE - update comment
router.put("/vacationSpots/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		} else {
			
			VacationSpot.findById(req.params.id).populate("comments").exec(function(err, foundVacationSpot){
				if(err){
					console.log(err);
					res.redirect("/vacationSpots/" + foundVacationSpot._id);
				} else {
					foundVacationSpot.rating = calcVacationSpotRating(foundVacationSpot);
					foundVacationSpot.save();
					
					res.redirect("/vacationSpots/" + req.params.id);
				}
			});
		}
	});
});

//DESTROY ROUTE - delete comment
router.delete("/vacationSpots/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req,res){
	VacationSpot.findById(req.params.id).populate("comments").exec(function(err, foundVacationSpot){
		if(err){
			console.log(err);
			res.redirect("/vacationSpots/" + foundVacationSpot._id);
		} else {
			//create new comment
			Comment.findByIdAndRemove(req.params.comment_id, function(err){
				if(err){
					res.redirect("back");
				} else {
					foundVacationSpot.comments.remove({_id: req.params.comment_id});
					
					foundVacationSpot.rating = calcVacationSpotRating(foundVacationSpot);
					foundVacationSpot.save();
					
					res.redirect("/vacationSpots/" + req.params.id);
				}
			});
		}
	});
});


//calculation of average rating for vacationspots

function calcVacationSpotRating(vacationSpot){
	var ratingAverage = 0; 
	var counter = 0; 
	
	if(vacationSpot.comments.length != 0){

		vacationSpot.comments.forEach(function(comment){
			ratingAverage += comment.rating;
			counter++;
		});

		ratingAverage /= counter;
	}

	return ratingAverage;	
}


module.exports= router;