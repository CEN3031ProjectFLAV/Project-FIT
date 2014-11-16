'use strict';

//Exercises service used to communicate Exercises REST endpoints
angular.module('exercises').factory('Exercises', ['$resource',
	function($resource) {
		return $resource('exercises/:exerciseId', { exerciseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);