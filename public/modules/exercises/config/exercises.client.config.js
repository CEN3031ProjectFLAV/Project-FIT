'use strict';

// Configuring the Articles module
angular.module('exercises').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Exercises', 'exercises', 'dropdown', '/exercises(/create)?');
		Menus.addSubMenuItem('topbar', 'exercises', 'List Exercises', 'exercises');
		Menus.addSubMenuItem('topbar', 'exercises', 'New Exercise', 'exercises/create');
	}
]);