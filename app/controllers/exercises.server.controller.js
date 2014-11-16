'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Exercise = mongoose.model('Exercise'),
	_ = require('lodash');

/**
 * Create a Exercise
 */
exports.create = function(req, res) {
	var exercise = new Exercise(req.body);
	exercise.user = req.user;

	exercise.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(exercise);
		}
	});
};

/**
 * Show the current Exercise
 */
exports.read = function(req, res) {
	res.jsonp(req.exercise);
};

/**
 * Update a Exercise
 */
exports.update = function(req, res) {
	var exercise = req.exercise ;

	exercise = _.extend(exercise , req.body);

	exercise.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(exercise);
		}
	});
};

/**
 * Delete an Exercise
 */
exports.delete = function(req, res) {
	var exercise = req.exercise ;

	exercise.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(exercise);
		}
	});
};

/**
 * List of Exercises
 */
exports.list = function(req, res) { Exercise.find().sort('-created').populate('user', 'displayName').exec(function(err, exercises) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(exercises);
		}
	});
};

/**
 * Exercise middleware
 */
exports.exerciseByID = function(req, res, next, id) { Exercise.findById(id).populate('user', 'displayName').exec(function(err, exercise) {
		if (err) return next(err);
		if (! exercise) return next(new Error('Failed to load Exercise ' + id));
		req.exercise = exercise ;
		next();
	});
};

/**
 * Exercise authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.exercise.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};