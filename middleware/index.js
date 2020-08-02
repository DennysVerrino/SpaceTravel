var Comment = require("../models/comment.js");
var User = require("../models/user");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			} else {
				//does User own the comment?
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect("/login");
	}
}

middlewareObj.checkIfAdmin = function(req, res, next){
	if(req.isAuthenticated()){
		User.findById({_id : "5f17edbda29dfe0e9ff6c9f1"}, function(err, foundAdmin){
			if(err){
				console.log(err);
				res.redirect("back");
			}
			else{
				if(foundAdmin._id.equals(req.user._id)){
					return next();
				} else {
					res.redirect("back");
				}	
			}
		});
	} else {
		res.redirect("/login");
	}
}


module.exports = middlewareObj;