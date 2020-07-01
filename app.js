var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.render("landing.ejs");
});

app.get("/vacationSpots", function(req, res){
	var vacationSpots = [
		{ name: "Mars", image: "https://images.unsplash.com/photo-1556165356-d84ef32f04cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" },
		{ name: "Venus", image: "https://images.unsplash.com/photo-1590514989822-22c85a57ea48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80" },
		{ name: "Moon", image: "https://images.unsplash.com/photo-1514897575457-c4db467cf78e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" }
	]
	
	res.render("vacationSpots.ejs", {vacationSpots: vacationSpots});
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("The SpaceTravel server has started!");
});