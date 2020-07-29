var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");
var VacationSpot = require("./models/vacationSpot");
var Comment = require("./models/comment");
var seedDB = require("./seeds");

//-----------------------------------------------------------------------------------------------------------------------------------
// all Routes
var commentRoutes = require("./routes/comments.js");
var vacationSpotRoutes = require("./routes/vacationSpots.js");
var authRoutes = require("./routes/index.js");
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
app.use(methodOverride("_method"));

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
// seed the Database
//seedDB();

//-----------------------------------------------------------------------------------------------------------------------------------
// Middleware to pass variables to every route like the currentUser
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use(authRoutes);
app.use(vacationSpotRoutes);
app.use(commentRoutes);


// var data = [
// 	{ 
// 		name: "Moon",
// 		station: "Artemis Station",
// 		type: "Apartment",
// 		guests: 4,
// 		bedrooms: 2,
// 		thumbnail: "/images/best_spot_moon.jpg",
// 		rating: 4,
// 		price: 144,
// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo 						 viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor magna aliqua. Quis ipsum suspendisse ultrices",
// 		details: 
// 			{
// 				checkin: "6:00PM - 9:00PM",
// 				checkout: "11:00AM",
// 				firstAid: "Yes",
// 				wifi: "Yes",
// 				bathtub: "Yes",
// 				airCon: "Yes",
// 				pets: "Allowed"
// 			}
// 	},
// 	{ 
// 		name: "Mars",
// 		station: "Apollo Station",
// 		type: "Apartment",
// 		guests: 2,
// 		bedrooms: 1,
// 		thumbnail: "/images/best_spot_mars.jpg",
// 		rating: 4,
// 		price: 93,
// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo 						 viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor magna aliqua. Quis ipsum suspendisse ultrices. ipsum 						 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo ",
// 		details:
// 			{
// 				checkin: "6:00PM - 9:00PM",
// 				checkout: "11:00AM",
// 				firstAid: "Yes",
// 				wifi: "Yes",
// 				bathtub: "No",
// 				airCon: "Yes",
// 				pets: "Not Allowed"
// 			}
// 	},
// 	{ 
// 		name: "Venus",
// 		station: "Aphrodite Station",
// 		type: "Apartment",
// 		guests: 2,
// 		bedrooms: 1,
// 		thumbnail: "/images/best_spot_venus.jpg",
// 		rating: 5,
// 		price: 269,
// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo 						 viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor magna aliqua. Quis ipsum suspendisse ultrices. Lorem 						 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo 						 		 viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor magna aliqua. Quis ipsum suspendisse ultrices ",
// 		details:
// 			{
// 				checkin: "6:00PM - 9:00PM",
// 				checkout: "11:00AM",
// 				firstAid: "Yes",
// 				wifi: "No",
// 				bathtub: "No",
// 				airCon: "Yes",
// 				pets: "Allowed"
// 			}
// 	}
// ]
// //add a few vacation Spots
// data.forEach(function(seed){
// 	VacationSpot.create(seed, function(err, vacationSpot){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("added a vacation spot!");
// 			vacationSpot.save();
// 		}
// 	});
// });

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The SpaceTravel server has started!");
});