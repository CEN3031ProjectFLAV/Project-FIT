'use strict';

// Configuring the Articles module
angular.module('searchusers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Search Users', 'searchusers', '/searchusers(/create)?');
		//Menus.addSubMenuItem('topbar', 'searchusers', 'List Searchusers', 'searchusers');
		//Menus.addSubMenuItem('topbar', 'searchusers', 'New Searchuser', 'searchusers/create');
	}
]);