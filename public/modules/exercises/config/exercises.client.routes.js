'use strict';

//Setting up route
angular.module('exercises').config(['$stateProvider',
	function($stateProvider) {
		// Exercises state routing
		$stateProvider.
		state('listExercises', {
			url: '/exercises',
			templateUrl: 'modules/exercises/views/list-exercises.client.view.html'
		}).
		state('createExercise', {
			url: '/exercises/create',
			templateUrl: 'modules/exercises/views/create-exercise.client.view.html'
		}).
		state('viewExercise', {
			url: '/exercises/:exerciseId',
			templateUrl: 'modules/exercises/views/view-exercise.client.view.html'
		}).
		state('editExercise', {
			url: '/exercises/:exerciseId/edit',
			templateUrl: 'modules/exercises/views/edit-exercise.client.view.html'
		});
	}
]);