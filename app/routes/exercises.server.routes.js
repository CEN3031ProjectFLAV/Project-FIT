'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var exercises = require('../../app/controllers/exercises');

	// Exercises Routes
	app.route('/exercises')
		.get(exercises.list)
		.post(users.requiresLogin, exercises.create);

	app.route('/exercises/:exerciseId')
		.get(exercises.read)
		.put(users.requiresLogin, exercises.hasAuthorization, exercises.update)
		.delete(users.requiresLogin, exercises.hasAuthorization, exercises.delete);

	// Finish by binding the Exercise middleware
	app.param('exerciseId', exercises.exerciseByID);
};