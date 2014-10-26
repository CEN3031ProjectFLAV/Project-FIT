'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Searchuser Schema
 */
var SearchuserSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Searchuser name',
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

mongoose.model('Searchuser', SearchuserSchema);