'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Friend = mongoose.model('Friend'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a Friend
 */
exports.create = function(req, res) {
	var friend = new Friend(req.body);

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
 * Show the current Friend
 */
exports.read = function(req, res) {
	res.jsonp(req.friend);
};

/**
 * Update a Friend
 */
exports.update = function(req, res) {
	var friend = req.friend ;

	friend = _.extend(friend , req.body);

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
 * Delete an Friend
 */
exports.delete = function(req, res) {
	var friend = req.friend ;

	friend.remove(function(err) {
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
 * List of Friends
 */
exports.list = function(req, res) { 
	var friendsList=[];
	Friend.find().populate('user_id').exec(function(err, friends) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}  else{
				//get all the friends that are not actual friends
				//out of the list  and get thier user ids
				for (var i=0;i<friends.length; i=i+1){
					if (friends[i].user_id !== undefined)
						friendsList.push(friends[i].user_id);
				}
				res.jsonp(friends);
				//fetch all the users that correspond to the user id in the friends list
	/*			User.find().where('_id').in(friendsList).exec(function(err, users) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.jsonp(users); //send users to the Controllers
					}
				});    */
		}
	});

};

/**
 * Friend middleware
 */
exports.friendByID = function(req, res, next, id) { Friend.findById(id).populate('user', 'displayName').exec(function(err, friend) {
		if (err) return next(err);
		if (! friend) return next(new Error('Failed to load Friend ' + id));
		req.friend = friend ;
		next();
	});
};

/**
 * Friend authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.friend.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};