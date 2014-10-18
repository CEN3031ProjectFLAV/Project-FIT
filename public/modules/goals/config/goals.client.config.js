'use strict';

// Configuring the Articles module
angular.module('goals').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Goals', 'goals', 'dropdown', '/goals(/create)?');
		Menus.addSubMenuItem('topbar', 'goals', 'List Goals', 'goals');
		Menus.addSubMenuItem('topbar', 'goals', 'New Goal', 'goals/create');
	}
]);