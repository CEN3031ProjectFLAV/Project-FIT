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
	name: {
		type: String,
		default: '',
		required: 'Please fill Friend name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Friend', FriendSchema);