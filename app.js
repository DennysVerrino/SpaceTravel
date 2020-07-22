var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

//-----------------------------------------------------------------------------------------------------------------------------------
// How to use PostCSS
// reads the css-file with nested css and variables
// writes new css-file with legal css rules 
// header needs to import the newly created file

const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const mixins = require('postcss-mixins');
const precss = require('precss');
const postcssHextoRGBA = require('postcss-hexrgba');
const fs = require('fs');

fs.readFile(__dirname + '/public/stylesheets/styles.css', (err, css) => {
  postcss([mixins, precss, autoprefixer, postcssHextoRGBA])
    .process(css, { from: __dirname + '/public/stylesheets/styles.css', to: __dirname + '/public/stylesheets/result.css' })
    .then(result => {
      fs.writeFile(__dirname + '/public/stylesheets/result.css', result.css, () => true)
      if ( result.map ) {
        fs.writeFile(__dirname + '/public/stylesheets/result.css', result.map, () => true)
      }
    })
})
//---------------------------------------------------------------------------------------------------------------------------------

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/spacetravel");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//-----------------------------------------------------------------------------------------------------------------------------------
// SCHEMA SETUP
var vacationSpotSchema = new mongoose.Schema({
	name: String,
	station: String,
	type: String,
	guests: Number,
	bedrooms: Number,
	thumbnail: String,
	rating: Number,
	price: Number 
});

var VacationSpot = mongoose.model("VacationSpot", vacationSpotSchema);

// VacationSpot.create(
// 	{ name: "Helios", station: "Sun Station", type: "Apartment", guests: 2, bedrooms: 1, thumbnail: "/images/best_spot_moon.jpg", rating: 5.0, price:269 }, 
// 	function(err, vacationSpot){
// 		if(err){
// 			console.log(err);
// 		}	else{
// 				console.log("newly created VS: ");
// 				console.log(vacationSpot);
// 		}	
// 	});

//-----------------------------------------------------------------------------------------------------------------------------------
// PASSPORT CONFIURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//-----------------------------------------------------------------------------------------------------------------------------------

app.get("/", function(req, res){
	//Get all vacationSpots from DB
	VacationSpot.find({}, function(err, vacationSpots){
		if(err){
			console.log(err);
		} else{
			res.render("landing.ejs", {bestSpots: vacationSpots});	
		}
	});
});

app.get("/vacationSpots", function(req, res){
	//Get all vacationSpots from DB
	var searchPlanet = req.query.planet.charAt(0).toUpperCase() + req.query.planet.slice(1).toLowerCase();
	var guestsNumber = req.query.guestsNumber;
	
	if(guestsNumber > 0 && guestsNumber != undefined){
		VacationSpot.find({name: searchPlanet, guests: guestsNumber}, function(err, vacationSpots){
			if(err){
				console.log(err);
			} else{
				res.render("vacationSpots.ejs", {vacationSpots: vacationSpots});	
			}
		});   
	} 
	else {
		VacationSpot.find({name: searchPlanet}, function(err, vacationSpots){
			if(err){
				console.log(err);
			} else{
				res.render("vacationSpots.ejs", {vacationSpots: vacationSpots});	
			}
		}); 
	}
});

//-----------------------------------------------------------------------------------------------------------------------------------
// AUTH ROUTES

app.get("/register", function(req, res){
	res.render("register.ejs");
});

//handle sign up logic
app.post("/register", function(req, res){
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


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The SpaceTravel server has started!");
});