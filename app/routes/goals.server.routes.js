'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var goals = require('../../app/controllers/goals');

	// Goals Routes
	app.route('/goals')
		.get(goals.list)
		.post(users.requiresLogin, goals.create);

	app.route('/goals/:goalId')
		.get(goals.read)
		.put(users.requiresLogin, goals.hasAuthorization, goals.update)
		.delete(users.requiresLogin, goals.hasAuthorization, goals.delete);

	// Finish by binding the Goal middleware
	app.param('goalId', goals.goalByID);
};