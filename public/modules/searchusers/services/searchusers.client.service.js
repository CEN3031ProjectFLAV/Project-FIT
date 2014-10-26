'use strict';

//Searchusers service used to communicate Searchusers REST endpoints
angular.module('searchusers').factory('Searchusers', ['$resource',
	function($resource) {
		return $resource('searchusers/:searchuserId', { searchuserId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);