var Comment = require("../models/comment.js")

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


module.exports = middlewareObj;