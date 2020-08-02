var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var VacationSpot = require("../models/vacationSpot");

//-----------------------------------------------------------------------------------------------------------------------------------
// ROOT ROUTE
router.get("/", function(req, res){
	//Get all vacationSpots from DB
	VacationSpot.find({}, function(err, vacationSpots){
		if(err){
			console.log(err);
		} else{
			res.render("landing.ejs", {bestSpots: vacationSpots, currentUser: req.user});	
		}
	});
});

//-----------------------------------------------------------------------------------------------------------------------------------
// AUTH ROUTES
router.get("/register", function(req, res){
	res.render("register.ejs");
});

//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register.ejs");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/");
		});
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/",
		failureRedirect: "/login"
	}), function(req, res){
	
});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

//legal route
router.get("/imprint", function(req, res){
	res.render("legal.ejs");	
});

//MIDDLEWARE
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect("/login");
	}
}

module.exports= router;