'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('UsersList', ['$resource',
	function($resource) {
		return $resource('userslist', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);