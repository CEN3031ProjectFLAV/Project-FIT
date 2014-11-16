'use strict';

// Searchusers controller
angular.module('searchusers').controller('SearchusersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Searchusers',
	function($scope, $stateParams, $location, Authentication, Searchusers ) {
		$scope.authentication = Authentication;

		// Create new Searchuser
		$scope.create = function(user) {
			// Create new Searchuser object
			$scope.friend = new Searchusers ({
				friend_id: user._id
			});

			var friendToSend= new Searchusers ({
				friend_id: user._id
			});

			// Redirect after save
			friendToSend.$save(function(response) {
				//TODO add the correct redirect page that gives us this users profile maybe???
				$location.path('friends/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Searchuser
		$scope.remove = function( searchuser ) {
			if ( searchuser ) { searchuser.$remove();

				for (var i in $scope.searchusers ) {
					if ($scope.searchusers [i] === searchuser ) {
						$scope.searchusers.splice(i, 1);
					}
				}
			} else {
				$scope.searchuser.$remove(function() {
					$location.path('searchusers');
				});
			}
		};

		// Update existing Searchuser
		$scope.update = function() {
			var searchuser = $scope.searchuser ;

			searchuser.$update(function() {
				$location.path('searchusers/' + searchuser._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Searchusers
		$scope.find = function() {
			$scope.users = Searchusers.query($scope.authentication.user);
		};

		// Find existing Searchuser
		$scope.findOne = function() {
			$scope.searchuser = Searchusers.get({ 
				searchuserId: $stateParams.searchuserId
			});
		};
	}
]);