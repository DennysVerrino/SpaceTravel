var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
	title: String,
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	rating: Number,
	created: Date
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;