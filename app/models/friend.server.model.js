'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Friend Schema
 */
var FriendSchema = new Schema({
	//points to the user that is the friend
	friend_id: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	//points to the user that created the friend
		user_id: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Friend', FriendSchema);