'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Exercise Schema
 */
var ExerciseSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Exercise name',
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

mongoose.model('Exercise', ExerciseSchema);