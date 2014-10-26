'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Searchuser = mongoose.model('Searchuser'),
	User = mongoose.model('User'),
	Friend = mongoose.model('Friend'),
	_ = require('lodash');

/**
 * Create a Searchuser
 */
exports.create = function(req, res) {
	var friend = new Friend(req.body);
	friend.user = req.user;

	friend.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(friend);
		}
	});
};

/**
 * Show the current Searchuser
 */
exports.read = function(req, res) {
	res.jsonp(req.searchuser);
};

/**
 * Update a Searchuser
 */
exports.update = function(req, res) {
	var searchuser = req.searchuser ;

	searchuser = _.extend(searchuser , req.body);

	searchuser.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(searchuser);
		}
	});
};

/**
 * Delete an Searchuser
 */
exports.delete = function(req, res) {
	var searchuser = req.searchuser ;

	searchuser.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(searchuser);
		}
	});
};

/**
 * List of Searchusers
 */
exports.list = function(req, res) { User.find().exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};

/**
 * Searchuser middleware
 */
exports.searchuserByID = function(req, res, next, id) { Searchuser.findById(id).populate('user', 'displayName').exec(function(err, searchuser) {
		if (err) return next(err);
		if (! searchuser) return next(new Error('Failed to load Searchuser ' + id));
		req.searchuser = searchuser ;
		next();
	});
};

/**
 * Searchuser authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.searchuser.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};