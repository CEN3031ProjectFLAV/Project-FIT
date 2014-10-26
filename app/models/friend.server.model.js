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
		type: String,
		required: 'must be a actual user',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Friend', FriendSchema);