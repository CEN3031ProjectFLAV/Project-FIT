'use strict';

//Setting up route
angular.module('searchusers').config(['$stateProvider',
	function($stateProvider) {
		// Searchusers state routing
		$stateProvider.
		state('listSearchusers', {
			url: '/searchusers',
			templateUrl: 'modules/searchusers/views/list-searchusers.client.view.html'
		}).
		state('createSearchuser', {
			url: '/searchusers/create',
			templateUrl: 'modules/searchusers/views/create-searchuser.client.view.html'
		}).
		state('viewSearchuser', {
			url: '/searchusers/:searchuserId',
			templateUrl: 'modules/searchusers/views/view-searchuser.client.view.html'
		}).
		state('editSearchuser', {
			url: '/searchusers/:searchuserId/edit',
			templateUrl: 'modules/searchusers/views/edit-searchuser.client.view.html'
		});
	}
]);