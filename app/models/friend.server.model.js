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
	user_id: {
		type: Number,
		ref: 'User'
	},
		user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Friend', FriendSchema);