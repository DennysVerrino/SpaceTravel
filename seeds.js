var mongoose = require("mongoose");
var VacationSpot = require("./models/vacationSpot");
var Comment = require("./models/comment");

var data = [
	{ 
		name: "Moon",
		station: "Artemis Station",
		type: "Apartment",
		guests: 4,
		bedrooms: 2,
		thumbnail: "/images/best_spot_moon.jpg",
		rating: 4,
		price: 144
	},
	{ 
		name: "Mars",
		station: "Apollo Station",
		type: "Apartment",
		guests: 2,
		bedrooms: 1,
		thumbnail: "/images/best_spot_mars.jpg",
		rating: 4,
		price: 93
	},
	{ 
		name: "Venus",
		station: "Aphrodite Station",
		type: "Apartment",
		guests: 2,
		bedrooms: 1,
		thumbnail: "/images/best_spot_venus.jpg",
		rating: 5,
		price: 269
	}
]


function seedDB(){
	//remove all vacation spots
	Comment.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed all comments!");
			
			VacationSpot.deleteMany({}, function(err){
				// if(err){
				// 	console.log(err);
				// } else {
				// 	console.log("removed all vacation spots!");

				// 	//add a few vacation Spots
				// 	data.forEach(function(seed){
				// 		VacationSpot.create(seed, function(err, vacationSpot){
				// 			if(err){
				// 				console.log(err);
				// 			} else {
				// 				console.log("added a vacation spot!");

				// 				//create a comment
				// 				Comment.create(
				// 					{
				// 						title: "Excellent!",
				// 						text: "This is such a nice place to stay. Definetly coming back!",
				// 						author: "Dennys Verrino",
				// 						rating: 4
				// 					}, function(err, comment){
				// 						if(err){
				// 							console.log(err);
				// 						} else {
				// 							vacationSpot.comments.push(comment);
				// 							vacationSpot.save();
				// 							console.log("Created new comment");
				// 						}
				// 				});
				// 			}
				// 		});
				// 	});
				// }
			});
		}
	});
}

module.exports = seedDB;