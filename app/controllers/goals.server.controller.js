'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Goal = mongoose.model('Goal'),
	_ = require('lodash');

/**
 * Create a Goal
 */
exports.create = function(req, res) {
	var goal = new Goal(req.body);
	goal.user = req.user;

	goal.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goal);
		}
	});
};

/**
 * Show the current Goal
 */
exports.read = function(req, res) {
	res.jsonp(req.goal);
};

/**
 * Update a Goal
 */
exports.update = function(req, res) {
	var goal = req.goal ;

	goal = _.extend(goal , req.body);

	goal.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goal);
		}
	});
};

/**
 * Delete an Goal
 */
exports.delete = function(req, res) {
	var goal = req.goal ;

	goal.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goal);
		}
	});
};

/**
 * List of Goals
 */
exports.list = function(req, res) { Goal.find().sort('-created').populate('user', 'displayName').exec(function(err, goals) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(goals);
		}
	});
};

/**
 * Goal middleware
 */
exports.goalByID = function(req, res, next, id) { Goal.findById(id).populate('user', 'displayName').exec(function(err, goal) {
		if (err) return next(err);
		if (! goal) return next(new Error('Failed to load Goal ' + id));
		req.goal = goal ;
		next();
	});
};

/**
 * Goal authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.goal.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};