'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var searchusers = require('../../app/controllers/searchusers');

	// Searchusers Routes
	app.route('/searchusers')
		.get(searchusers.list)
		.post(users.requiresLogin, searchusers.create);

	app.route('/searchusers/:searchuserId')
		.get(searchusers.read)
		.put(users.requiresLogin, searchusers.hasAuthorization, searchusers.update)
		.delete(users.requiresLogin, searchusers.hasAuthorization, searchusers.delete);

	// Finish by binding the Searchuser middleware
	app.param('searchuserId', searchusers.searchuserByID);
};